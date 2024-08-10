import React from 'react';
import CropCard from '../Statefull/CropCard';

export default function ShowcaseCrops() {
    return (
        <div className='grid grid-cols-3 '>
            <CropCard cropName='Wheat' />
            <CropCard cropName='Rice' />
            <CropCard cropName='Corn' />
            <CropCard cropName='Potato' />
            <CropCard cropName='Cotton' />
            <CropCard cropName='Sugarcane' />
            <CropCard cropName='Cabbage' />
            <CropCard cropName='Maize' />
            <CropCard cropName='Green Peas' />
        </div>
    );
}
