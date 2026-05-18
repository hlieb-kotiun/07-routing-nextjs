"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NewNote } from "../../types/note";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  // Create Note
  const { mutate } = useMutation({
    mutationFn: (data: NewNote) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const initialValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),

    content: Yup.string()
      .trim()
      .max(500, "Content must be at most 500 characters"),

    tag: Yup.string()
      .required("Tag is required")
      .oneOf(
        ["Todo", "Work", "Personal", "Meeting", "Shopping"],
        "Invalid tag value",
      ),
  });

  const handleSubmit = (
    values: FormValues,
    // helper: FormikHelpers<FormValues>,
  ) => {
    mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    // helper.resetForm();
  };

  return (
    <Formik
      validationSchema={NoteFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error}>
            {(error) => <div>{error}</div>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;
