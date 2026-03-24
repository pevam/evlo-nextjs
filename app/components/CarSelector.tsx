'use client';

import { useState, useMemo } from 'react';
import Select from 'react-select';
import { EV_DATABASE, EVDatabaseEntry, searchEVs } from '@/app/data/ev-database';

interface CarSelectorProps {
  onSelect: (car: EVDatabaseEntry) => void;
  value?: EVDatabaseEntry | null;
}

export default function CarSelector({ onSelect, value }: CarSelectorProps) {
  const options = useMemo(() => {
    return EV_DATABASE.map(car => ({
      value: car.id,
      label: `${car.make} ${car.model}`,
      data: car
    }));
  }, []);

  const selectedOption = useMemo(() => {
    if (!value) return null;
    return options.find(opt => opt.value === value.id) || null;
  }, [value, options]);

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#ffffff',
      borderColor: '#B8EC3F',
      borderWidth: '2px',
      borderRadius: '12px',
      padding: '4px 8px',
      fontSize: '14px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#9AE500'
      }
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#B8EC3F' : state.isFocused ? '#f0f8ff' : '#ffffff',
      color: state.isSelected ? '#1E1E1E' : '#333',
      padding: '10px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#f0f8ff'
      }
    }),
    menuList: (base: any) => ({
      ...base,
      maxHeight: '300px',
      backgroundColor: '#ffffff'
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#ffffff',
      border: '2px solid #B8EC3F',
      borderRadius: '12px',
      marginTop: '4px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#999'
    }),
    noOptionsMessage: (base: any) => ({
      ...base,
      color: '#666',
      padding: '10px',
      fontSize: '14px'
    })
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => {
        if (option?.data) {
          onSelect(option.data);
        }
      }}
      styles={customStyles}
      placeholder="Tipka 'Tesla', 'VW', 'Model 3'..."
      isClearable={true}
      isSearchable={true}
      formatOptionLabel={(option: any) => (
        <div style={{ fontSize: '14px' }}>
          <strong>{option.data.make}</strong> {option.data.model}
          <span style={{ color: '#999', marginLeft: '8px', fontSize: '12px' }}>
            {option.data.batteryCapacity} kWh
          </span>
        </div>
      )}
      filterOption={(option: any, inputValue: string) => {
        if (!option?.data || !inputValue) return true;
        const searchText = inputValue.toLowerCase();
        const { make, model } = option.data;
        return (
          (make?.toLowerCase?.().includes(searchText) || false) ||
          (model?.toLowerCase?.().includes(searchText) || false) ||
          (`${make} ${model}`.toLowerCase().includes(searchText) || false)
        );
      }}
    />
  );
}
