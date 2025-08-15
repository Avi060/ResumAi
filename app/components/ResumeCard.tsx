import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath }, onDelete
}: {
  resume: Resume;
  onDelete: (id: string, imagePath: string) => void
}) => {

  const { fs } = usePuterStore();
  const [resumeURL, setResumeUrl] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);


  useEffect(() => {
    const loadresume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }
    loadresume();
  }, [imagePath]);

  return (
    <div className="relative not-[]:resume-card animate-in fade-in duration-1000">
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowConfirm(true); // Show the confirmation modal
        }}
        className="absolute top-1 right-0 p-1 rounded-full hover:bg-red-100 transition"
        title="Delete Resume"
      >
        <img src="/icons/cross.svg" alt="Delete" className="w-4 h-4" />
      </button>

      <Link to={`/resume/${id}`}>
        <div className="resume-card-header mt-4">
          <div className="flex flex-col gap-2">
            {companyName && (
              <h2 className="!text-black font-bold break-words">{companyName}</h2>
            )}
            {jobTitle && (
              <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
            )}
            {!companyName && !jobTitle && (
              <h2 className="!text-black font-bold">Resume</h2>
            )}
          </div>

          <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        </div>
        {resumeURL && (
          <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
              <img
                src={resumeURL}
                alt="resume"
                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
              />
            </div>
          </div>
        )}
      </Link>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Delete Resume?</h2>
              <p className="text-gray-600 text-sm">
                Are you sure you want to delete this resume? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(id, imagePath);
                    setShowConfirm(false);
                  }}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}


export default ResumeCard;
