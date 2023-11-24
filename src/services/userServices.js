import * as request from "@/utils/request";

export const getSuggested = async ({ page = 1, perPage = 5 }) => {

    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                per_page: perPage
            }
        });

        return res.data;
    } catch (e) {
        console.log(e);
    }
}