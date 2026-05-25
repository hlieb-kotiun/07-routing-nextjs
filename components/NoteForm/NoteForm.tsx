"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NewNote } from "../../types/note";
import { useNewDraftStore } from "@/lib/stores/noteStores";
import { ChangeEvent } from "react";

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

  const { draft, setDraft, clearDraft } = useNewDraftStore();

  // Create Note
  const { mutate } = useMutation({
    mutationFn: (data: NewNote) => createNote(data),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleDraftChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const initialValues: FormValues = {
    title: draft.title,
    content: draft.content,
    tag: draft.tag || "Todo",
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
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ handleChange }) => {
        const handleFieldChange = (
          event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >,
        ) => {
          handleChange(event);
          handleDraftChange(event);
        };

        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field
                onChange={handleFieldChange}
                id="title"
                type="text"
                name="title"
                className={css.input}
              />
              <ErrorMessage name="title" className={css.error}>
                {(error) => <div>{error}</div>}
              </ErrorMessage>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                onChange={handleFieldChange}
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
              <Field
                onChange={handleFieldChange}
                as="select"
                id="tag"
                name="tag"
                className={css.select}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                onClick={onClose}
                type="button"
                className={css.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default NoteForm;
