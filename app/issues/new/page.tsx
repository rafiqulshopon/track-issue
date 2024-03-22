'use client';

import axios from 'axios';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationShcemas';
import { z } from 'zod';

type FormData = z.infer<typeof createIssueSchema>;

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

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An error occurred, please try again');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>

        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}

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

        {errors.description && (
          <Text color='red' as='p'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
