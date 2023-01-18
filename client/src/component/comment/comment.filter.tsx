import styled from 'styled-components';
import { CustomSelect } from '../styled/atom/CustomSelect';
import { TextField } from '../styled/atom/Input';
import { FC, FormEvent, SetStateAction, useState } from 'react';
import { EventTargetValue, ICommentFilterProp } from '../../types/comment/comment.type';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../styled/atom/Button';

const options = [
  { value: false, label: 'Descending year' },
  { value: true, label: 'Increasing Year ' },
];

export const CommentFilterWrapper = styled.form`
  //background-color: ${(props) => props.theme.background};
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
  max-width: 800px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CommentFilter: FC<ICommentFilterProp> = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [name, setName] = useState(searchParams.get('name') || '');
  const [message, setMessage] = useState(searchParams.get('message') || '');

  const [data, setData] = useState<{ label: string; value: boolean }>(
    searchParams.get('data') == 'false' ? options[0] : options[1]
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params: any = {};
    if (email) params.email = email;
    if (name) params.name = name;
    if (message) params.message = message;
    if (data) params.data = data.value;
    setSearchParams(params);
    onSubmit({ email, name, message, data: data.value });
  };
  return (
    <CommentFilterWrapper onSubmit={handleSubmit}>
      <TextField
        placeholder="Filter by email"
        value={email}
        onChange={(e: EventTargetValue<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <TextField
        placeholder="Filter by name"
        value={name}
        onChange={(e: EventTargetValue<HTMLInputElement>) => setName(e.target.value)}
      />
      <TextField
        placeholder="Filter by message"
        value={message}
        onChange={(e: EventTargetValue<HTMLInputElement>) => setMessage(e.target.value)}
      />
      <CustomSelect
        options={options}
        isClearable
        value={data}
        onChange={(arg) => setData(arg as SetStateAction<{ label: string; value: boolean }>)}
        isSearchable={false}
        placeholder="Filter by data"
      />

      <Button type="submit">Filter</Button>
    </CommentFilterWrapper>
  );
};
