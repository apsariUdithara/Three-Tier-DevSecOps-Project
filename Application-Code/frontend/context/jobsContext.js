
import React, { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./globalContext";
import axios from "axios";
import toast from "react-hot-toast";


const JobsContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;


export const JobsContextProvider = ({ children }) => {
    const { userProfile, getUserProfile} = useGlobalContext();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userJobs, setUserJobs] = useState([]);

    const [searchQuery, setSearchQuery] = useState({
      tags: "",
      location: "",
      title: "",
    });

      //filters
    const [filters, setFilters] = useState({
      fullTime: false,
      partTime: false,
      internship: false,
      contract: false,
      fullStack: false,
      backend: false,
      devOps: false,
      uiUx: false,
     });


  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(120000);
    const getJobs = async () => {
        setLoading(true);
        try {
          const res = await axios.get("/api/v1/jobs");
          setJobs(res.data);
        } catch (error) {
          console.log("Error getting jobs", error);
        } finally {
          setLoading(false);
        }
    };

    const createJob = async (jobData) => {
        try {
          const res = await axios.post("/api/v1/jobs", jobData);
    
          toast.success("Job created successfully");
    
          setJobs((prevJobs) => [res.data, ...prevJobs]);
    
          // update userJobs
          if (userProfile._id) {
            setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs]);
            
          }

        } catch (error) {
          console.log("Error creating job", error);
        }
    };

    const getUserJobs = async (userId) => {
        setLoading(true);
        try {
          const res = await axios.get("/api/v1/jobs/user/" + userId);
    
          setUserJobs(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error getting user jobs", error);
        } finally {
          setLoading(false);
        }
    };

      const searchJobs = async (tags, location, title) => {
        setLoading(true);
        try {
          // build query string
          const query = new URLSearchParams();
    
          if (tags) query.append("tags", tags);
          if (location) query.append("location", location);
          if (title) query.append("title", title);
    
          // send the request
          const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);
    
          // set jobs to the response data
          setJobs(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error searching jobs", error);
        } finally {
          setLoading(false);
        }
    };  

// get job by id
    const getJobById = async (id) => {
        setLoading(true);
        try {
        const res = await axios.get(`/api/v1/jobs/${id}`);

        setLoading(false);
        return res.data;
        } catch (error) {
        console.log("Error getting job by id", error);
        } finally {
        setLoading(false);
        }
    };

      // like a job
    const likeJob = async (jobId) => {
        console.log("Job liked", jobId);
        try {
        const res = await axios.put(`/api/v1/jobs/like/${jobId}`);
        console.log("Job liked successfully", res);
        toast.success("Job liked successfully");
        getJobs();
        } catch (error) {
        console.log("Error liking job", error);
        }
    };

     // apply to a job
    const applyToJob = async (jobId) => {
      const job = jobs.find(job => job._id === jobId);

        if(job && job.applicants.includes(userProfile._id)){
          toast.error("You have already applied to this job");
          return;
        }
        try {
        const res = await axios.put(`/api/v1/jobs/apply/${jobId}`);

        toast.success("Applied to job successfully");
        getJobs();
        } catch (error) {
        console.log("Error applying to job", error);
        toast.error(error.response.data.message);
        }
    };
    
      // delete a job
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/v1/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      setUserJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("Error deleting job", error);
    }
  };

  

  const handleSearchChange = (searchName, value) => {
    setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };
    

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        if (userProfile._id) {
          getUserJobs(userProfile._id);
        }
      }, [userProfile._id]);

    

    return (
        <JobsContext.Provider value={{
          jobs,
          loading,
          createJob,
          userJobs,
          searchJobs,
          getJobById,
          likeJob,
          applyToJob,
          deleteJob,
          handleSearchChange,
          searchQuery,
          setSearchQuery,
          handleFilterChange,
          filters,
          minSalary,
          setMinSalary,
          maxSalary,
          setMaxSalary,
          setFilters,

        }}>
            {children}
        </JobsContext.Provider>
    );
};


export const useJobsContext = () => {
    return useContext(JobsContext);
};