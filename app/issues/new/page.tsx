'use client';

import axios from 'axios';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

interface FormData {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<FormData>();

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          console.error('Error creating new issue:', error);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>

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

      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
