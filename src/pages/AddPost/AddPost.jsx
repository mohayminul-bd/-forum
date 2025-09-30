import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddPost = () => {
  const { user } = useAuth(); // email ashbe
  const navigate = useNavigate();
  const axios = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Education", label: "Education" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
  ];

  // ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (formData) => {
    const newPost = {
      authorImage: user?.photoURL || "https://i.ibb.co/YWQ0mnc/avatar.png",
      authorName: user?.displayName || "Anonymous",
      authorEmail: user?.email,
      created_by: user?.email || "guest",
      title: formData.title,
      description: formData.description,
      tag: formData.tag?.value || "General",
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("/posts", newPost);
      console.log("Response from server:", res.data);
      alert("✅ Post added successfully!");
      reset();
      navigate("/dashboard/myPost");
    } catch (err) {
      console.error("Error saving post:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">➕ Add Post</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-lg p-6 rounded-lg"
      >
        {/* Author info */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/YWQ0mnc/avatar.png"}
            alt="author"
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="font-semibold">{user?.displayName || "Anonymous"}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Post Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Post Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Write something..."
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Tag */}
        <div>
          <label className="block font-medium mb-1">Tag</label>
          <Controller
            name="tag"
            control={control}
            rules={{ required: "Tag is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                placeholder="Select a tag"
              />
            )}
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-success w-full">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
