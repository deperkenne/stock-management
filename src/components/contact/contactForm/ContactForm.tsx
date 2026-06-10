import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../utils/cn';
import ContactInput from '../ContactInput';
import ContactTextArea from '../ContactTextArea';
import { contactSchema, type ContactFormData } from '../validation';
import { CONTACT_FIELDS } from './Data';

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');


// hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    try {
      // Replace with real API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/30">
          <svg
            className="h-8 w-8 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="text-sm text-slate-400">
          We'll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus('idle')}
          className="mt-2 text-sm font-medium text-indigo-400 underline-offset-2 transition-colors hover:text-indigo-300 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {submitStatus === 'error' && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          Something went wrong. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CONTACT_FIELDS.map((field) => (
          <ContactInput
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            autoComplete={field.autoComplete}
            error={errors[field.id]?.message}
            {...register(field.id)}
          />
        ))}
      </div>

      <ContactTextArea
        id="message"
        label="Message"
        placeholder="Tell us more about your request…"
        rows={6}
        error={errors.message?.message}
        {...register('message')}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'inline-flex w-full items-center justify-center gap-2.5 rounded-lg px-6 py-3',
          'text-sm font-semibold text-white',
          'bg-indigo-600 transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950',
          isSubmitting
            ? 'cursor-not-allowed opacity-60'
            : 'hover:bg-indigo-500 active:scale-[0.99]'
        )}
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
