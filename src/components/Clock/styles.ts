import styled from 'styled-components'

import clockBackImg from '../../assets/clock-back.png'

interface PointerProps {
  rotationAngle: number
}

export const Container = styled.section`
  align-self: center;
  background: url('${clockBackImg}'), ${ctx => ctx.theme.colors.box.secondary};
  background-size: cover;

  border-radius: 50%;
  border: 0.5rem solid ${ctx => ctx.theme.colors.box.primary};

  width: 17rem;
  height: 17rem;

  position: relative;
`

export const Pointer = styled.img<PointerProps>`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -87.5%)
    ${ctx => `rotateZ(${ctx.rotationAngle}deg)`};

  transform-origin: 50% 90%;
`
