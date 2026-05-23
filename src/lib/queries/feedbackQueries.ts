import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE;

type FeedbackResponse = {
    items: QuestionCardProps[];

    nextOffset: number | null;
};

export const fetchFeedbackPage = async (
    offset: number,
): Promise<FeedbackResponse> => {
    const response = await axios.get(`${API}/api/public-feedback`, {
        params: {
            offset,
        },
    });

    return response.data;
};

type SubmitFeedbackPayload = {
    discoverSource: string;

    platforms: string[];

    rating: number;

    message: string;
};

export const submitFeedback = async (payload: SubmitFeedbackPayload) => {
    const response = await axios.post(`${API}/api/add-feedback`, payload);

    return response.data;
};
