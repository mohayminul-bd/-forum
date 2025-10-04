import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReportedComments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axios.get("https://fourm-server.vercel.app/reports");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reported Comments</h2>
      <table className="table w-full bg-white border">
        <thead>
          <tr>
            <th>Comment ID</th>
            <th>Feedback</th>
            <th>Reported At</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((report) => (
            <tr key={report._id}>
              <td>{report.commentId}</td>
              <td>{report.feedback}</td>
              <td>{new Date(report.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedComments;
