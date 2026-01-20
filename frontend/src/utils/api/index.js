import axios from "axios";

// let baseApi = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/',
// })

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export let userAPI = {
    login(data) {
        return baseApi2.post(`login/`, data, {
            headers: {
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    loginJWT(data) {
        return baseApi2.post(`token/`, data).then(res => res.data);
    },

    refreshJWT(data) {
        return baseApi2.post(`token/refresh/`, data).then(res => res.data);
    },

    getMe(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`profile/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            }
        }).then(res => res.data);
    },

    changePassword(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`change_password/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    editMe(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`profile/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getTechSupportMessages(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`user/tech-support/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            }
        }).then(res => res.data);
    },

    createTechSupportMessage(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`user/tech-support/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editTechSupportMessage(messageId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`user/tech-support/${messageId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteTechSupportMessage(messageId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`user/tech-support/${messageId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },
}

export let companyAPI = {
    register(data){
        console.log(data)
        return baseApi2.post(`company/singup/`, data).then(res => res.data);
    },
    getAutoAppointment(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/auto-appointment/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                is_save_mode: true
            }
        }).then(res => res.data);
    },
    applyAutoAppointment(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/auto-appointment/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                is_save_mode: false
            }
        }).then(res => res.data);
    },

    getTasks(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/task/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                page_size: 1000
            }
        }).then(res => res.data);
    },

    createTask(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/task/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editTask(taskId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`company/task/${taskId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteTask(taskId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/task/${taskId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getTaskRecommendations(taskId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/task-recommendation/${taskId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getVoting(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/voting/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createVoting(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/voting/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editVoting(voteId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`company/voting/${voteId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteVoting(voteId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/voting/${voteId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getQualifications(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/qualification/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createQualification(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/qualification/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editQualification(qualificationId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`company/qualification/${qualificationId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteQualification(qualificationId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/qualification/${qualificationId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getWorkers(token, search) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/worker/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                search: search || ""
            }
        }).then(res => res.data);
    },

    createWorker(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/worker/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editWorker(workerId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.patch(`company/worker/${workerId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    editWorkerSchedule(scheduleId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.patch(`company/worker-schedule/${scheduleId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteWorker(workerId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/worker/${workerId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getAppointments(token, search) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/appointment/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createAppointment(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/appointment/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    commentAppointment(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/comment-task/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteComment(commentId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/comment-task/${commentId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getLogs(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/logs/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                page_size: 1000
            }
        }).then(res => res.data.results);
    },

    getSupervisors(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`iot/company-options/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    editSupervisor(supervisorId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.patch(`iot/company-options/${supervisorId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getWorkerReport(workerId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/worker-report/${workerId}/`, {
            headers: {
                Authorization: "Bearer " + userToken
            },
        }).then(res => res.data);
    },

    getOrders(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`iot/company-offer/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createOrder(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`iot/company-offer/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    editOrder(orderId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.patch(`iot/company-offer/${orderId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteOrder(orderId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`iot/company-offer/${orderId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },
}

export let workerAPI = {
    getVoting(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`worker/voting/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },
    createVote(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`worker/vote/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
            }
        }).then(res => res.data);
    },
    editVote(voteId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`worker/vote/${voteId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },
}