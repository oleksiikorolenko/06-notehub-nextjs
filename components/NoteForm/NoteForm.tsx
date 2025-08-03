'use client'

import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import css from "../NoteForm/NoteForm.module.css";

const validationSchema = Yup.object({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500),
    tag: Yup.mixed().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});


    interface NoteFormProps {
        onSubmit: (note: { title: string; content: string; tag: string }) => void;
    
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
   
    return (
        <Formik initialValues={{ title: '', content: '', tag: 'Todo' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                onSubmit(values);
                actions.resetForm();
            }}
        >
            {() => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field type="text" name="title" className={css.input} />
                        <ErrorMessage name="title" component="span" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            as="textarea"
                            name="content"
                            rows={8}
                            className={css.textarea}
                        />
                        <ErrorMessage name="content" component="span" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" name="tag" className={css.select}>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage name="tag" component="span" className={css.error} />
                    </div>

                    <div className={css.actions}>
                       <button
                            type="submit"
                            className={css.submitButton}
                        >
                            Create note
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}