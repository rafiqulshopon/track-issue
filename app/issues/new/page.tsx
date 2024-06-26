'use client';

import axios from 'axios';
import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationShcemas';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '@/app/components';

type FormData = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setIsSubmitting(false);
      setError('An error occurred, please try again');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder='Description'
            />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {isSubmitting ? (
          <Button disabled>
            Submitting... <Spinner />
          </Button>
        ) : (
          <Button type='submit'>Submit new issue</Button>
        )}
      </form>
    </div>
  );
};

export default NewIssuePage;
