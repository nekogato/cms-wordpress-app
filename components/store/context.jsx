import { useReducer, createContext, useEffect, useState } from "react";

import axios from "axios";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const value = {
        createFormSubmit: async ({
            title,
            content,
        }) => {

            const loginData = {
                username: "swdsxl",
                password: "eu^9z*n@WtBZ&vyZ#tRA%KE@"
            };

            axios.post('https://www.nekodeveloper.com/dev3/wp-json/jwt-auth/v1/token', loginData)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_nicename', res.data.user_nicename);
                localStorage.setItem('user_email', res.data.user_email);
                localStorage.setItem('user_display_name', res.data.user_display_name);
            })
            .catch((err) => {
                console.log(err);
            });


            const formdata = {
                title: title,
                content: content,
                status: 'publish'
            };
            
            const resp = await axios.post('https://www.nekodeveloper.com/dev3/wp-json/wp/v2/posts', formdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                })
        
            if (resp.status === 201) {
                return true;
            }
        
            return false;
        },
        formSubmit: async ({
            your_name,
            your_email,
            your_subject,
            your_message,
        }) => {
            var bodyFormData = new FormData();
            bodyFormData.append('your_name', your_name);
            bodyFormData.append('your_email', your_email);
            bodyFormData.append('your_subject', your_subject);
            bodyFormData.append('your_message', your_message);
            
            const resp = await axios({
                method: "post",
                url: "https://www.nekodeveloper.com/dev3/wp-json/contact-form-7/v1/contact-forms/33/feedback",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
        
            if (resp.status === 200) {
                return true;
            }
        
            return false;
        },
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
  