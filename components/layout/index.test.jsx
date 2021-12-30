import { render, screen } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Layout from './index';

describe('Layout', () => {
    it('Passes and wraps props', () => {

        
        render(
            <>
            <Layout>
                <div data-testid="child-test">Test</div>
            </Layout>
            </>
        );

        const element = screen.getByTestId('child-test');

        expect(screen.getByTestId('child-test')).toBeVisible();
    })
})