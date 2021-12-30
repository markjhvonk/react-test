import Link from 'next/link';
import styled from 'styled-components'

interface ButtonTypes {
    children: any;
    href: string;
    state: boolean;
}

const StyledButton = styled.button<{ state: boolean }>`
  cursor: pointer;
  display: inline-block;
  border-radius: 4px;
  padding: 8px 0;
  margin: 8px 16px;
  width: 120px;
  background: ${props => props.state ? "#fff" : "transparent"};
  color: ${props => props.state ? "#000" : "#fff"};
  border: 2px solid #fff;
  transition: all .1s ease;
  &:hover {
    background: #fff;
    color: #000
  }
`

function Button({ children, href, state }: ButtonTypes) {
    return (
      <>
      { href ? 
        <Link href={href}>
          <StyledButton state={state}>
            {children}
          </StyledButton>
        </Link>
        :
        <StyledButton state={state}>
          {children}
        </StyledButton>
      }
      </>
    );
}

export default Button;