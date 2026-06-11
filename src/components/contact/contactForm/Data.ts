import type { ContactFormData } from './validation';

type TextFieldKey = Exclude<keyof ContactFormData, 'message'>;

export interface ContactFieldConfig {
  id: TextFieldKey;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

export const CONTACT_FIELDS: ContactFieldConfig[] = [
  { id: 'name',    label: 'Full Name',       placeholder: 'Jane Doe',           autoComplete: 'name'  },
  { id: 'email',   label: 'Email Address',   placeholder: 'jane@example.com',   type: 'email', autoComplete: 'email' },
  { id: 'phone',   label: 'Phone (optional)',placeholder: '+1 (555) 000-0000',  type: 'tel',   autoComplete: 'tel'   },
  { id: 'subject', label: 'Subject',         placeholder: 'How can we help?'                          },
];
