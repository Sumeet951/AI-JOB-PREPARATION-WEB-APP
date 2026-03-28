import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast"

const initialState = { 
    interviewReport: {},
    interviewReports: [],
}
export const generateInterviewReport=createAsyncThunk("/interview/generate",async(data)=>{
    try{
        const response=axiosInstance.post("/interview/",data);
        console.log("Response", response);
        toast.promise(response,{
            loading:"Generating Interview Report..",
            success:(data)=>{                return data?.data?.message || "Interview report generated successfully";
            },
        });
        return await response
    }

catch(error){
    toast.error(error?.response?.data?.message || "Failed to generate interview report");
}
})
export const getInterviewReport=createAsyncThunk("/interview/get",async(interviewId)=>{
    try{
        const response=axiosInstance.get(`/interview/${interviewId}`);
        toast.promise(response,{
            loading:"Fetching Interview Report..",
            success:(data)=>{
                return data?.data?.message || "Interview report fetched successfully";
            },
            error:"Failed to fetch interview report"    
        })
        return await response
    }
    catch(errr){
        toast.error(errr?.response?.data?.message || "Failed to fetch interview report");
    }
})
export const getAllInterviewReports=createAsyncThunk("/interview/getAll",async()=>{
    try{
        const response=axiosInstance.get("/interview");
        toast.promise(response,{
            loading:"Fetching Interview Reports..",
            success:(data)=>{
                return data?.data?.message || "Interview reports fetched successfully";
            },
            error:"Failed to fetch interview reports"
        });
        return await response
    }
    catch(error){
        toast.error(error?.response?.data?.message || "Failed to fetch interview reports");
    }
})
export const generateResumePdf=createAsyncThunk("/interview/generateResumePdf",async({interviewId,data})=>{
    try{
        const response=axiosInstance.post(`/interview/resume/pdf/${interviewId}`,data,{
            responseType: 'blob'
        });
        toast.promise(response,{
            loading:"Generating Resume PDF..",
            success:"Resume PDF generated successfully",
            error:"Failed to generate resume pdf"
        })
        const result = await response;
        
        // Create download link
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${interviewId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return result;
    }
    catch(error){
        toast.error(error?.response?.data?.message || "Failed to generate resume pdf");
    }
})

const interviewSlice = createSlice({
    name:"interview",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(generateInterviewReport.fulfilled,(state,action)=>{
            state.interviewReport=action.payload?.data?.data || {};
        })
        .addCase(getInterviewReport.fulfilled,(state,action)=>{
            state.interviewReport=action.payload?.data?.data || {};
        })
        .addCase(getAllInterviewReports.fulfilled,(state,action)=>{
            state.interviewReports=action.payload?.data?.data || [];
        })
    }
})
export default interviewSlice.reducer;