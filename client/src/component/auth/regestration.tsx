import { WrapperAuth } from '../styled/atom/Main';
import { InputRegContainer, TextField } from '../styled/atom/Input';
import { ErrorMessage } from '../styled/atom/Error';
import { LinkParagraph } from '../styled/atom/Text';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { IRegistration } from '../../types/auth/auth.type';
import { FC } from 'react';
import {
  emailValidation,
  passwordValidation,
  requireString,
} from '../../config/customValidation/validation';
import { Button } from '../styled/atom/Button';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Block, Form, Text } from '../../page/auth.page';
import { signup } from '../../redux/thunk/auth.thunk';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const Container = styled.div`
  margin-top: 1rem;
`;

export const Registration: FC<IRegistration> = ({ toggle, setToggle }) => {
  const theme = useTypeSelector((state) => state.theme.themes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const Register = async ({ email, name, password }: IFormInputs) => {
    await dispatch(signup({ email, password, name }));
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  };

  function onChange(value: string | null) {
    if (value) {
      localStorage.setItem('authCapthca', value);
    }
  }

  return (
    <WrapperAuth>
      <Block>
        <Form onSubmit={handleSubmit(Register)}>
          <Text>Sign up</Text>
          <Container>
            <InputRegContainer>
              <TextField validation={register('name', requireString)} placeholder="Name" />
            </InputRegContainer>
            {errors.name && <ErrorMessage error={errors.name?.message} />}
            <TextField
              error={errors.name?.message}
              validation={register('email', emailValidation)}
              placeholder="Email"
            />
            {errors.email && <ErrorMessage error={errors.email?.message}></ErrorMessage>}
            <TextField
              validation={register('password', passwordValidation)}
              placeholder="Password"
            />
            {errors.password && <ErrorMessage error={errors.password?.message}></ErrorMessage>}
            <ReCAPTCHA
              onChange={onChange}
              sitekey="6LeuvdIjAAAAAAJxcuFahurWn_QvvYcHJeUY_0Ff"
              theme={theme}
            />
            <Button>Continue</Button>
          </Container>
        </Form>
        {toggle && (
          <LinkParagraph onClick={() => setToggle(false)}>
            Already have an account? Log in!
          </LinkParagraph>
        )}
      </Block>
    </WrapperAuth>
  );
};
export const MRegister = motion(Registration);
