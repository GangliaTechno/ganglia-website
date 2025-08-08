import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Applicationform.css";


export default function ApplicationForm() {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const [form, setForm] = useState({
    // Section 1
    fullName: "",
    email: "",
    phone: "",
    currentCityCountry: "",
    preferredLocation: "",
    nationality: "",
    linkedin: "",
    portfolio: "",
    relevantLinks: "",


    // Section 2
    roleAppliedFor: "",
    department: "",
    employmentType: {
      fullTime: false,
      partTime: false,
      freelanceContract: false,
      internship: false,
    },
    availableDate: "",
    expectedCTC: "",
    noticePeriod: "",
    authorizedWork: null,
    sponsorshipNeeded: null,


    // Section 3
    education: [{ degree: "", institution: "", yearCompleted: "", grade: "" }],


    // Section 4
    experience: [
      { companyName: "", jobTitle: "", duration: "", responsibilities: "", reasonLeaving: "" },
    ],
    totalExperienceYears: "",
    currentlyEmployed: null,
    ledTeams: "",


    // Section 5
    programmingLanguages: "",
    toolsTechnologies: "",
    certifications: "",
    projectSamples: "",
    comfortableWithTeams: null,
    agileExperience: null,


    // Section 6
    whyJoin: "",
    careerGoals: "",
    feedbackHandling: "",
    complexProblem: "",
    idealWorkEnvironment: "",
    openToRelocation: null,
    remoteWorkExperience: null,


    // Section 7
    references: [
      { name: "", designation: "", company: "", email: "", phone: "", relationship: "" },
      { name: "", designation: "", company: "", email: "", phone: "", relationship: "" },
    ],


    // Section 8
    resume: null,
    coverLetter: null,
    supportingDocs: null,
    videoIntro: null,


    // Section 9
    declareTrue: false,
    agree: false,
  });


  const [isSubmitting, setIsSubmitting] = useState(false);


  // Generic change handler
  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;


  if (name.startsWith("employmentType.")) {
    const key = name.split(".")[1];
    setForm((prev) => ({
      ...prev,
      employmentType: { ...prev.employmentType, [key]: checked },
    }));
  } else if (name === "declareTrue" || name === "agree") {
    setForm((prev) => ({ ...prev, [name]: checked }));
  } else if (type === "radio") {
    setForm((prev) => ({ ...prev, [name]: value === "true" }));
  } else if (files) {
    const file = files[0];
    
    // **NEW: Real-time file size validation**
    if (file) {
      const MAX_FILE_SIZES = {
        resume: 5 * 1024 * 1024,        // 5 MB
        coverLetter: 5 * 1024 * 1024,   // 5 MB
        supportingDocs: 10 * 1024 * 1024, // 10 MB
        videoIntro: 50 * 1024 * 1024     // 50 MB
      };


      const maxSize = MAX_FILE_SIZES[name];
      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
        toast.error(`File size (${fileSizeMB} MB) exceeds the ${maxSizeMB} MB limit for ${name}.`);
        e.target.value = ""; // Clear the file input
        return;
      }
    }
    
    setForm((prev) => ({ ...prev, [name]: file || null }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};



  // Fixed requirement check for declarations
  const checkDeclarations = () => form.declareTrue && form.agree;


  // Update email body to match new field names
  const composeEmailBody = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          🎯 NEW APPLICATION RECEIVED
        </h2>
        <h3>Position Applied For</h3>
        <p>${(state?.jobTitle ?? form.roleAppliedFor) || "N/A"}</p>


        <h3>Section 1: Basic Information</h3>
        <p><strong>Full Name:</strong> ${form.fullName}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone}</p>
        <p><strong>Current City & Country:</strong> ${form.currentCityCountry}</p>
        <p><strong>Preferred Location:</strong> ${form.preferredLocation || "N/A"}</p>
        <p><strong>Nationality:</strong> ${form.nationality}</p>
        <p><strong>LinkedIn:</strong> ${form.linkedin || "N/A"}</p>
        <p><strong>Portfolio:</strong> ${form.portfolio || "N/A"}</p>
        <p><strong>Other Links:</strong> ${form.relevantLinks || "N/A"}</p>


        <h3>Section 2: Position Details</h3>
        <p><strong>Department:</strong> ${form.department}</p>
        <p><strong>Employment Type:</strong> ${
          Object.entries(form.employmentType)
            .filter(([, v]) => v)
            .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
            .join(", ") || "N/A"
        }</p>
        <p><strong>Available Date:</strong> ${form.availableDate || "N/A"}</p>
        <p><strong>Expected CTC:</strong> ${form.expectedCTC || "N/A"}</p>
        <p><strong>Notice Period:</strong> ${form.noticePeriod || "N/A"}</p>
        <p><strong>Authorized Work:</strong> ${
          form.authorizedWork === true ? "Yes" : form.authorizedWork === false ? "No" : "N/A"
        }</p>
        <p><strong>Sponsorship Needed:</strong> ${
          form.sponsorshipNeeded === true ? "Yes" : form.sponsorshipNeeded === false ? "No" : "N/A"
        }</p>


        <h3>Section 3: Education</h3>
        ${form.education
          .map(
            (edu, i) => `
        <div>
          <p><strong>Degree #${i + 1}:</strong> ${edu.degree || "N/A"}</p>
          <p><strong>Institution:</strong> ${edu.institution || "N/A"}</p>
          <p><strong>Year Completed:</strong> ${edu.yearCompleted || "N/A"}</p>
          <p><strong>Grade:</strong> ${edu.grade || "N/A"}</p>
        </div>
      `,
          )
          .join("")}


        <h3>Section 4: Work Experience</h3>
        ${form.experience
          .map(
            (exp, i) => `
        <div>
          <p><strong>Company #${i + 1}:</strong> ${exp.companyName || "N/A"}</p>
          <p><strong>Job Title:</strong> ${exp.jobTitle || "N/A"}</p>
          <p><strong>Duration:</strong> ${exp.duration || "N/A"}</p>
          <p><strong>Responsibilities:</strong> ${exp.responsibilities || "N/A"}</p>
          <p><strong>Reason Leaving:</strong> ${exp.reasonLeaving || "N/A"}</p>
        </div>
      `,
          )
          .join("")}
        <p><strong>Total Experience (years):</strong> ${form.totalExperienceYears || "N/A"}</p>
        <p><strong>Currently Employed:</strong> ${
          form.currentlyEmployed === true ? "Yes" : form.currentlyEmployed === false ? "No" : "N/A"
        }</p>
        <p><strong>Teams Led:</strong> ${form.ledTeams || "N/A"}</p>


        <h3>Section 5: Skills</h3>
        <p><strong>Programming Languages:</strong> ${form.programmingLanguages || "N/A"}</p>
        <p><strong>Tools / Technologies:</strong> ${form.toolsTechnologies || "N/A"}</p>
        <p><strong>Certifications:</strong> ${form.certifications || "N/A"}</p>
        <p><strong>Project Samples:</strong> ${form.projectSamples || "N/A"}</p>
        <p><strong>Comfortable with Teams:</strong> ${
          form.comfortableWithTeams === true ? "Yes" : form.comfortableWithTeams === false ? "No" : "N/A"
        }</p>
        <p><strong>Agile Experience:</strong> ${
          form.agileExperience === true ? "Yes" : form.agileExperience === false ? "No" : "N/A"
        }</p>


        <h3>Section 6: Cultural Fit</h3>
        <p><strong>Why Join:</strong> ${form.whyJoin || "N/A"}</p>
        <p><strong>Career Goals:</strong> ${form.careerGoals || "N/A"}</p>
        <p><strong>Feedback Handling:</strong> ${form.feedbackHandling || "N/A"}</p>
        <p><strong>Complex Problem:</strong> ${form.complexProblem || "N/A"}</p>
        <p><strong>Ideal Work Environment:</strong> ${form.idealWorkEnvironment || "N/A"}</p>
        <p><strong>Open to Relocation:</strong> ${
          form.openToRelocation === true ? "Yes" : form.openToRelocation === false ? "No" : "N/A"
        }</p>
        <p><strong>Remote Work Experience:</strong> ${
          form.remoteWorkExperience === true ? "Yes" : form.remoteWorkExperience === false ? "No" : "N/A"
        }</p>


        <h3>Section 7: References</h3>
        ${form.references
          .map(
            (ref, i) => `
        <div>
          <p><strong>Name #${i + 1}:</strong> ${ref.name || "N/A"}</p>
          <p><strong>Designation:</strong> ${ref.designation || "N/A"}</p>
          <p><strong>Company:</strong> ${ref.company || "N/A"}</p>
          <p><strong>Email:</strong> ${ref.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${ref.phone || "N/A"}</p>
          <p><strong>Relationship:</strong> ${ref.relationship || "N/A"}</p>
        </div>
      `,
          )
          .join("")}


        <h3>Section 8: Attachments</h3>
        <p><strong>Resume:</strong> ${form.resume ? form.resume.name : "N/A"}</p>
        <p><strong>Cover Letter:</strong> ${form.coverLetter ? form.coverLetter.name : "N/A"}</p>
        <p><strong>Supporting Documents:</strong> ${form.supportingDocs ? form.supportingDocs.name : "N/A"}</p>
        <p><strong>Video Introduction:</strong> ${form.videoIntro ? form.videoIntro.name : "N/A"}</p>


        <h3>Section 9: Declarations</h3>
        <p><strong>Declaration Confirmed:</strong> ${form.declareTrue ? "Yes" : "No"}</p>
        <p><strong>Agreed to Background Check:</strong> ${form.agree ? "Yes" : "No"}</p>
      </div>
    `;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();


  if (!checkDeclarations()) {
    toast.error("Please accept all required declarations.");
    return;
  }
  if (!form.resume) {
    toast.error("Resume is required and must be a PDF.");
    return;
  }
  if (form.resume.type !== "application/pdf") {
    toast.error("Only PDF resumes are accepted.");
    return;
  }


 // File size validation code remains the same...
  const MAX_FILE_SIZES = {
    resume: 5 * 1024 * 1024,
    coverLetter: 5 * 1024 * 1024,
    supportingDocs: 10 * 1024 * 1024,
    videoIntro: 50 * 1024 * 1024
  };



  // **NEW: File size validation**
 const filesToCheck = [
    { file: form.resume, name: 'Resume', maxSize: MAX_FILE_SIZES.resume },
    { file: form.coverLetter, name: 'Cover Letter', maxSize: MAX_FILE_SIZES.coverLetter },
    { file: form.supportingDocs, name: 'Supporting Documents', maxSize: MAX_FILE_SIZES.supportingDocs },
    { file: form.videoIntro, name: 'Video Introduction', maxSize: MAX_FILE_SIZES.videoIntro }
  ];


  for (const { file, name, maxSize } of filesToCheck) {
    if (file && file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      toast.error(`${name} file size (${fileSizeMB} MB) exceeds the ${maxSizeMB} MB limit.`);
      return;
    }
  }


  setIsSubmitting(true);


  try {
    const formData = new FormData();
    formData.append("recipient", "director@ganglia.in");
    formData.append("subject", `New Application: ${(state?.jobTitle ?? form.roleAppliedFor) || "Position"} (ID: ${jobId})`);
    formData.append("body", composeEmailBody());


    // **CHANGED**: Use "files" parameter name for all attachments
    if (form.resume) formData.append("files", form.resume);
    if (form.coverLetter) formData.append("files", form.coverLetter);
    if (form.supportingDocs) formData.append("files", form.supportingDocs);
    if (form.videoIntro) formData.append("files", form.videoIntro);


    // **CHANGED**: Updated endpoint URL
    const res = await fetch("https://tmmail.onrender.com/send-email-with-multiple-files/", {
      method: "POST",
      body: formData,
    });


    if (res.ok) {
      toast.success("Application submitted successfully!");
      // Reset form logic...
      setForm({
        fullName: "",
        email: "",
        phone: "",
        currentCityCountry: "",
        preferredLocation: "",
        nationality: "",
        linkedin: "",
        portfolio: "",
        relevantLinks: "",
        roleAppliedFor: "",
        department: "",
        employmentType: {
          fullTime: false,
          partTime: false,
          freelanceContract: false,
          internship: false,
        },
        availableDate: "",
        expectedCTC: "",
        noticePeriod: "",
        authorizedWork: null,
        sponsorshipNeeded: null,
        education: [{ degree: "", institution: "", yearCompleted: "", grade: "" }],
        experience: [
          { companyName: "", jobTitle: "", duration: "", responsibilities: "", reasonLeaving: "" },
        ],
        totalExperienceYears: "",
        currentlyEmployed: null,
        ledTeams: "",
        programmingLanguages: "",
        toolsTechnologies: "",
        certifications: "",
        projectSamples: "",
        comfortableWithTeams: null,
        agileExperience: null,
        whyJoin: "",
        careerGoals: "",
        feedbackHandling: "",
        complexProblem: "",
        idealWorkEnvironment: "",
        openToRelocation: null,
        remoteWorkExperience: null,
        references: [
          { name: "", designation: "", company: "", email: "", phone: "", relationship: "" },
          { name: "", designation: "", company: "", email: "", phone: "", relationship: "" },
        ],
        resume: null,
        coverLetter: null,
        supportingDocs: null,
        videoIntro: null,
        declareTrue: false,
        agree: false,
      });


      ["resume-upload", "cover-letter-upload", "supporting-docs-upload", "video-intro-upload"].forEach(
        (id) => {
          const input = document.getElementById(id);
          if (input) input.value = "";
        }
      );


      setTimeout(() => navigate("/careers"), 2000);
    } else {
      const errorData = await res.json();
      throw new Error(errorData.detail || `Failed with status ${res.status}`);
    }
  } catch (err) {
    toast.error(`Submission failed: ${err.message}`);
    setIsSubmitting(false);
  }
};



  return (
    <div className="application-form-wrapper">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="p-4"
        toastClassName={() =>
          "relative flex p-6 rounded-md justify-between cursor-pointer bg-white text-black"
        }
      />


      {/* Left panel: Job details */}
      {state?.jobDescription && (
        <div className="job-details-section">
          <h2>Job Details</h2>
          <div className="job-details-content">
            {Object.entries(state.jobDescription).map(([section, items]) => (
              <div key={section} className="job-detail-item">
                <h3 className="job-detail-title">{section}</h3>
                <ul className="job-detail-list">
                  {(Array.isArray(items) ? items : items.split("\n")).map(
                    (item, i) => (item.trim() ? <li key={i}>{item}</li> : null)
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Right panel: Application form */}
      <div className="form-container">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          ← Back
        </button>
        <div className="form-header">
          <h1>
            Apply for {(state?.jobTitle ?? form.roleAppliedFor) || "Position"}
          </h1>
          <p>Please fill in your details below</p>
        </div>


        {/* SINGLE FORM TAG - Remove the duplicate */}
       <form onSubmit={handleSubmit}>
  {/* Section 1: Basic Information */}
  <fieldset>
    <legend><h2>Section 1: Basic Information</h2></legend>

    <div>
      <label>Full Name (as per official ID) *</label>
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Email Address *</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Phone Number *</label>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Current City & Country *</label>
      <input
        type="text"
        name="currentCityCountry"
        value={form.currentCityCountry}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Preferred Location (if remote, write "Remote")</label>
      <input
        type="text"
        name="preferredLocation"
        value={form.preferredLocation}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Nationality *</label>
      <input
        type="text"
        name="nationality"
        value={form.nationality}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>LinkedIn Profile URL</label>
      <input
        type="url"
        name="linkedin"
        value={form.linkedin}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Portfolio/Website (if applicable)</label>
      <input
        type="url"
        name="portfolio"
        value={form.portfolio}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>GitHub / Behance / Other relevant links</label>
      <input
        type="text"
        name="relevantLinks"
        value={form.relevantLinks}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>
  </fieldset>


  {/* Section 2: Position Details */}
  <fieldset>
    <legend><h2>Section 2: Position Details</h2></legend>

    <div>
      <label>Role Applied For *</label>
      <input
        type="text"
        name="roleAppliedFor"
        value={form.roleAppliedFor}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Department (e.g., Tech / Marketing / HR) *</label>
      <input
        type="text"
        name="department"
        value={form.department}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
    </div>

    <div>
      <span>Employment Type *</span><br />
      <label>
        <input
          type="checkbox"
          name="employmentType.fullTime"
          checked={form.employmentType.fullTime}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Full-time
      </label><br />
      <label>
        <input
          type="checkbox"
          name="employmentType.partTime"
          checked={form.employmentType.partTime}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Part-time
      </label><br />
      <label>
        <input
          type="checkbox"
          name="employmentType.freelanceContract"
          checked={form.employmentType.freelanceContract}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Freelance / Contract
      </label><br />
      <label>
        <input
          type="checkbox"
          name="employmentType.internship"
          checked={form.employmentType.internship}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Internship
      </label>
    </div>

    <div>
      <label>Available Start Date</label>
      <input
        type="date"
        name="availableDate"
        value={form.availableDate}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Expected CTC</label>
      <input
        type="text"
        name="expectedCTC"
        value={form.expectedCTC}
        onChange={handleChange}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Notice Period (days)</label>
      <input
        type="number"
        name="noticePeriod"
        value={form.noticePeriod}
        onChange={handleChange}
        min="0"
        disabled={isSubmitting}
      />
    </div>

    <div>
      <span>Authorized to work?</span><br />
      <label>
        <input
          type="radio"
          name="authorizedWork"
          value="true"
          checked={form.authorizedWork === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="authorizedWork"
          value="false"
          checked={form.authorizedWork === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>

    <div>
      <span>Require sponsorship?</span><br />
      <label>
        <input
          type="radio"
          name="sponsorshipNeeded"
          value="true"
          checked={form.sponsorshipNeeded === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="sponsorshipNeeded"
          value="false"
          checked={form.sponsorshipNeeded === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
  </fieldset>


  {/* Section 3: Education Background */}
  <fieldset>
    <legend><h2>Section 3: Education Background</h2></legend>
    <p>Provide details of your highest qualification:</p>
    
    <div>
      <label>Degree / Certification</label>
      <input
        type="text"
        name="education[0].degree"
        value={form.education[0]?.degree || ''}
        onChange={e => {
          const newEdu = [...form.education];
          newEdu[0] = {...newEdu[0], degree: e.target.value };
          setForm({...form, education: newEdu });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Institution Name</label>
      <input
        type="text"
        name="education[0].institution"
        value={form.education[0]?.institution || ''}
        onChange={e => {
          const newEdu = [...form.education];
          newEdu[0] = {...newEdu[0], institution: e.target.value };
          setForm({...form, education: newEdu });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Year of Completion</label>
      <input
        type="text"
        name="education[0].yearCompleted"
        value={form.education[0]?.yearCompleted || ''}
        onChange={e => {
          const newEdu = [...form.education];
          newEdu[0] = {...newEdu[0], yearCompleted: e.target.value };
          setForm({...form, education: newEdu });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Grade / Percentage / CGPA</label>
      <input
        type="text"
        name="education[0].grade"
        value={form.education[0]?.grade || ''}
        onChange={e => {
          const newEdu = [...form.education];
          newEdu[0] = {...newEdu[0], grade: e.target.value };
          setForm({...form, education: newEdu });
        }}
        disabled={isSubmitting}
      />
    </div>
  </fieldset>


  {/* Section 4: Work Experience */}
  <fieldset>
    <legend><h2>Section 4: Work Experience</h2></legend>
    <p>Details of your latest experience:</p>
    
    <div>
      <label>Company Name</label>
      <input
        type="text"
        name="experience[0].companyName"
        value={form.experience[0]?.companyName || ''}
        onChange={e => {
          const newExp = [...form.experience];
          newExp[0] = {...newExp[0], companyName: e.target.value };
          setForm({...form, experience: newExp });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Job Title</label>
      <input
        type="text"
        name="experience[0].jobTitle"
        value={form.experience[0]?.jobTitle || ''}
        onChange={e => {
          const newExp = [...form.experience];
          newExp[0] = {...newExp[0], jobTitle: e.target.value };
          setForm({...form, experience: newExp });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Duration (From – To)</label>
      <input
        type="text"
        name="experience[0].duration"
        value={form.experience[0]?.duration || ''}
        onChange={e => {
          const newExp = [...form.experience];
          newExp[0] = {...newExp[0], duration: e.target.value };
          setForm({...form, experience: newExp });
        }}
        disabled={isSubmitting}
      />
    </div>

    <div>
      <label>Key Responsibilities and Achievements</label>
      <textarea
        name="experience[0].responsibilities"
        value={form.experience[0]?.responsibilities || ''}
        onChange={e => {
          const newExp = [...form.experience];
          newExp[0] = {...newExp[0], responsibilities: e.target.value };
          setForm({...form, experience: newExp });
        }}
        disabled={isSubmitting}
        rows={4}
      />
    </div>

    <div>
      <label>Reason for Leaving</label>
      <input
        type="text"
        name="experience[0].reasonLeaving"
        value={form.experience[0]?.reasonLeaving || ''}
        onChange={e => {
          const newExp = [...form.experience];
          newExp[0] = {...newExp[0], reasonLeaving: e.target.value };
          setForm({...form, experience: newExp });
        }}
        disabled={isSubmitting}
      />
    </div>
    
    <div>
      <label>Total Years of Experience</label>
      <input
        type="number"
        name="totalExperienceYears"
        value={form.totalExperienceYears}
        onChange={handleChange}
        min="0"
        disabled={isSubmitting}
      />
    </div>
    
    <div>
      <span>Currently employed?</span><br />
      <label>
        <input
          type="radio"
          name="currentlyEmployed"
          value="true"
          checked={form.currentlyEmployed === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="currentlyEmployed"
          value="false"
          checked={form.currentlyEmployed === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
    
    <div>
      <label>Have you led teams? How many members?</label>
      <input
        type="number"
        name="ledTeams"
        value={form.ledTeams}
        onChange={handleChange}
        min="0"
        disabled={isSubmitting}
      />
    </div>
  </fieldset>


  {/* Section 5: Skills Assessment */}
  <fieldset>
    <legend><h2>Section 5: Skills Assessment</h2></legend>

    <div>
      <label>Programming languages known (rate proficiency 1–5)</label>
      <textarea
        name="programmingLanguages"
        value={form.programmingLanguages}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>

    <div>
      <label>Tools & Technologies proficient in</label>
      <textarea
        name="toolsTechnologies"
        value={form.toolsTechnologies}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>

    <div>
      <label>Certifications (issuer and year)</label>
      <textarea
        name="certifications"
        value={form.certifications}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={2}
      />
    </div>

    <div>
      <label>Project/code sample links or attachments</label>
      <textarea
        name="projectSamples"
        value={form.projectSamples}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={2}
      />
    </div>
    
    <div>
      <span>Comfortable with cross-functional teams?</span><br />
      <label>
        <input
          type="radio"
          name="comfortableWithTeams"
          value="true"
          checked={form.comfortableWithTeams === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="comfortableWithTeams"
          value="false"
          checked={form.comfortableWithTeams === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
    
    <div>
      <span>Experience with Agile/Scrum methodologies?</span><br />
      <label>
        <input
          type="radio"
          name="agileExperience"
          value="true"
          checked={form.agileExperience === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="agileExperience"
          value="false"
          checked={form.agileExperience === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
  </fieldset>


  {/* Section 6: Cultural and Behavioral Fit */}
  <fieldset>
    <legend><h2>Section 6: Cultural & Behavioral Fit</h2></legend>

    <div>
      <label>Why do you want to join us?</label>
      <textarea
        name="whyJoin"
        value={form.whyJoin}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>

    <div>
      <label>Career goals for next 3 years</label>
      <textarea
        name="careerGoals"
        value={form.careerGoals}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>

    <div>
      <label>How do you handle feedback?</label>
      <textarea
        name="feedbackHandling"
        value={form.feedbackHandling}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>

    <div>
      <label>Describe a time you solved a complex problem</label>
      <textarea
        name="complexProblem"
        value={form.complexProblem}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={4}
      />
    </div>

    <div>
      <label>Describe your ideal work environment</label>
      <textarea
        name="idealWorkEnvironment"
        value={form.idealWorkEnvironment}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={3}
      />
    </div>
    
    <div>
      <span>Open to relocation?</span><br />
      <label>
        <input
          type="radio"
          name="openToRelocation"
          value="true"
          checked={form.openToRelocation === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="openToRelocation"
          value="false"
          checked={form.openToRelocation === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
    
    <div>
      <span>Have you worked remote/hybrid?</span><br />
      <label>
        <input
          type="radio"
          name="remoteWorkExperience"
          value="true"
          checked={form.remoteWorkExperience === true}
          onChange={handleChange}
          disabled={isSubmitting}
        /> Yes
      </label>
      <label>
        <input
          type="radio"
          name="remoteWorkExperience"
          value="false"
          checked={form.remoteWorkExperience === false}
          onChange={handleChange}
          disabled={isSubmitting}
        /> No
      </label>
    </div>
  </fieldset>


  {/* Section 7: References */}
  <fieldset>
    <legend><h2>Section 7: References</h2></legend>


    {form.references.map((refItem, idx) => (
      <div key={idx} style={{ marginBottom: "1.5rem" }}>
        <h4>Reference #{idx + 1}</h4>
        
        <div>
          <label>Name</label>
          <input
            type="text"
            value={refItem.name}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], name: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Designation</label>
          <input
            type="text"
            value={refItem.designation}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], designation: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Company</label>
          <input
            type="text"
            value={refItem.company}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], company: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={refItem.email}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], email: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="tel"
            value={refItem.phone}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], phone: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label>Relationship</label>
          <input
            type="text"
            value={refItem.relationship}
            onChange={e => {
              const newRefs = [...form.references];
              newRefs[idx] = { ...newRefs[idx], relationship: e.target.value };
              setForm({...form, references: newRefs });
            }}
            disabled={isSubmitting}
          />
        </div>
      </div>
    ))}
  </fieldset>


  {/* Section 8: Attachments */}
  <fieldset>
    <legend><h2>Section 8: Attachments</h2></legend>

    <div>
      <label>Upload Resume (PDF, Max 5MB) *</label>
      <div className="file-input-wrapper">
        <input
          type="file"
          name="resume"
          id="resume-upload"
          accept=".pdf"
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <label htmlFor="resume-upload" className="file-input-label" tabIndex={0}>
          📄 {form.resume ? form.resume.name : "Choose File"}
        </label>
      </div>
    </div>

    <div>
      <label>Upload Cover Letter (PDF/DOC, Max 5MB) - Optional</label>
      <div className="file-input-wrapper" style={{ marginTop: "1rem" }}>
        <input
          type="file"
          name="coverLetter"
          id="cover-letter-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <label htmlFor="cover-letter-upload" className="file-input-label" tabIndex={0}>
          📄 {form.coverLetter ? form.coverLetter.name : "Choose File"}
        </label>
      </div>
    </div>

    <div>
      <label>Upload Supporting Documents (PDF/DOC/Images, Max 10MB) - Optional</label>
      <div className="file-input-wrapper" style={{ marginTop: "1rem" }}>
        <input
          type="file"
          name="supportingDocs"
          id="supporting-docs-upload"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <label htmlFor="supporting-docs-upload" className="file-input-label" tabIndex={0}>
          📎 {form.supportingDocs ? form.supportingDocs.name : "Choose File"}
        </label>
      </div>
    </div>

  </fieldset>


  {/* Section 9: Declarations */}
  <fieldset>
    <legend><h2>Section 9: Declarations</h2></legend>


    <label>
      <input
        type="checkbox"
        name="declareTrue"
        checked={form.declareTrue}
        onChange={handleChange}
        disabled={isSubmitting}
        required
      />
      I hereby declare that the information provided is true and correct.
    </label>


    <label style={{ display: "block", marginTop: "0.5rem" }}>
      <input
        type="checkbox"
        name="agree"
        checked={form.agree}
        onChange={handleChange}
        disabled={isSubmitting}
        required
      />
      I agree to allow the company to verify my background and references.
    </label>
  </fieldset>


  {/* Form Actions */}
  <div className="form-actions">
    <button type="button" className="btn-secondary" disabled={isSubmitting} onClick={() => navigate(-1)}>
      Cancel
    </button>
    <button type="submit" className="btn-primary" disabled={isSubmitting || !checkDeclarations()}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  </div>
</form>


      </div>
    </div>
  );
}
