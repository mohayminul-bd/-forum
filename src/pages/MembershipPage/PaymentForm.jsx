import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 💰 Fixed Membership Fee
  const amount = 1; // $1 USD OR 100 BDT (server-side currency)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    // Step 1: Create Payment Method
    const { error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    }

    setError("");

    try {
      // Step 2: Create Payment Intent on server
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        email: user.email,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Update Membership
        await axiosSecure.post("/membership", { email: user.email });

        // Step 5: Save Payment History
        const paymentData = {
          email: user.email,
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types[0], // ✅ শুধু প্রথম method, আর error gone
          type: "membership",
          date: new Date(),
        };

        await axiosSecure.post("/payments", paymentData);

        // Step 6: Success alert
        await Swal.fire({
          icon: "success",
          title: "You are now a Gold Member! 🏅",
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          confirmButtonText: "Go to Dashboard",
        });

        navigate("/dashboard/homeDashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold text-center">
          Become a <span className="text-yellow-500">Gold Member</span>
        </h2>
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          className="btn btn-primary text-black w-full"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
