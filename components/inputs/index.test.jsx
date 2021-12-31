import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { SearchField } from './index';

describe('Layout', () => {
    it('Opens dropdown', () => {

        let testData = [{ id: 'test1', name: 'Test 1' }, { id: 'test2', name: 'Test 2' }, { id: 'test3', name: 'Test 3' }];
        
        render(
            <SearchField
                placeholder="Test searchField"
                dropdownData={testData} />
        );

        const dropdownBox = screen.getByRole('dropdown-box');
        expect(dropdownBox).toBeVisible();
    });
    it('Closes dropdown', () => {

        let testData = [];

        render(
            <SearchField
                placeholder="Test searchField"
                dropdownData={testData} />
        );

        const dropdownBox = screen.queryByRole('dropdown-box');
        expect(dropdownBox).toBeNull();
    });
});