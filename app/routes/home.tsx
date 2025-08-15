import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumAi" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {

  const { auth, fs, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDeleteResume = async (id: string, imagePath: string) => {
    try {
      setDeleting(true);
      setDeleteMessage("Deleting.....")
      const resumes = (await kv.list(`resume:${id}`, true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))

      await kv.delete(`resume:${id}`);   // delete from KV store
      await fs.delete(imagePath);    // delete file from fs
      await fs.delete(parsedResumes[0].resumePath); //remove from resumepath fs
      setResumes((prev) => prev.filter((r) => r.id !== id)); // remove from UI
      setDeleting(false);

    } catch (error) {
      console.error("Failed to delete resume:", error);
      setDeleteMessage("Something went wrong while deleting the resume.....");
      setDeleting(false);
      setDeleteMessage("");
    }
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadresumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))
      console.log("parsed-resumes", parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }
    loadresumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-small.svg')] bg-cover ">
      {isDeleting && (
    <div className="fixed inset-5 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="font-sans text-xl text-gray-800 bg-white bg-opacity-90 px-6 py-4 rounded-lg shadow-lg">
        {deleteMessage}
      </div>
    </div>
  )}

      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
