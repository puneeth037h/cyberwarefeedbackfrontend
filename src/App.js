import { useState, useEffect } from "react";

export default function App() {
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [feedbackList, setFeedbackList] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
   
  };

  const fetchFeedback = async () => {
    
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="container-fluid "> 
      <form onSubmit={handleSubmit} className=" card container-fluid d-flex flex-column align-self-center justify-content-center">
        <label className="form-label" for="name">name</label>
        <input name="name" value={feedback.name} onChange={handleChange} placeholder="Name" className="form-control" required />
        <label className="form-label" for="email">email</label>
        <input name="email" value={feedback.email} onChange={handleChange} placeholder="Email" type="email" className="form-control" required />
        <label className="form-label" for="message">feedback</label>
        <textarea name="message" value={feedback.message} onChange={handleChange} placeholder="Your feedback" className="form-control" required />
        <button type="submit" className="btn btn-primary">Submit</button>
        {success && <p className="">Feedback submitted successfully!</p>}
      </form>

      <div className="">
        <h2 className="">All Feedback</h2>
        <ul className="">
          {feedbackList.map(fb => (
            <li key={fb._id} className="">
              <p><strong>{fb.name}</strong> ({fb.email})</p>
              <p>{fb.message}</p>
              <p className="">{new Date(fb.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
