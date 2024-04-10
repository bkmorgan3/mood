import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs', () => {
    const mockedFunctions = {
        auth: () => new Promise((resolve) => resolve({userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC'})),
        ClerKProvider: ({children}) => <div>{children}</div>,
        useUser: () =>({
            isSignedIn: true,
            user: {
                id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
                fullName: 'Charles Harris'
            }
        })
    }
    return mockedFunctions
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})


test('Home', async () => {
    render(await Page())
    expect(screen.getByText('Get Started')).toBeTruthy()
})