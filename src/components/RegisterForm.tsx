import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValues } from '../types/types';
import { checkEmailAvailability, registerUser } from '../api/api';

const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: RegisterFormValues) => {
        setErrorMessage(null); // Clear previous errors

        try {
            const { data } = await checkEmailAvailability(values.email);

            if (data.isAvailable) {
                setErrorMessage('Email already registered. Please log in.');
                return;
            }

            await registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
                avatar: 'https://picsum.photos/800',
            });

            onSuccess();
        } catch (error) {
            setErrorMessage('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto">

            {errorMessage && (
                <div className="bg-red-200 border border-red-500 text-red-700 p-4 mb-4 rounded-md">
                    {errorMessage}
                </div>
            )}

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <Field
                            type="text"
                            name="name"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

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
                        Register
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;
