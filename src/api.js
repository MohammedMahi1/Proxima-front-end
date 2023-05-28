import axios from 'axios';


export const getMessages = async (conversationId,token) => {
    try {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/conversations/${conversationId}/messages`,
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createMessage = async (conversationId, content, token) => {
    try {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/conversations/${conversationId}/messages`,
            method: 'POST',
            data: {
                content : content
            },
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

