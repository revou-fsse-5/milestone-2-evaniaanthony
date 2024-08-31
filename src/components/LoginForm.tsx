import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LoginFormValues } from '../types/types';
import { fetchUsers } from '../api/api';
import { useAuth } from '../auth/AuthContext';

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: LoginFormValues) => {
        setErrorMessage(null); // Clear previous errors
        try {
            const { data } = await fetchUsers();
            const user = data.find((user: any) => user.email === values.email);

            if (!user) {
                setErrorMessage(" Account can't be found. Please register.");
                return;
            }

            if (user.password !== values.password) {
                setErrorMessage('Incorrect password. Please try again.');
                return;
            }

            const token = user.id.toString(); 
            login(token, user.name); 

            onSuccess(); // Callback for successful login
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="space-y-4">
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <Field
                        type="email"
                        name="email"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <Field
                        type="password"
                        name="password"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    Login
                </button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
