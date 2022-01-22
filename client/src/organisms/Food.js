import { useEffect, } from 'react';

import Formatter from '../atoms/Formatter'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../molecules/ButtonGroup'
import InputGroup from '../molecules/InputGroup'
import Buttons from '../atoms/Buttons'
import Formatter from '../atoms/Formatter'

const Food = {
    Buttons: function ({handleSave, handleCancel, handleRemove, disabled}) {
        return (
            <ButtonGroup>
                <Buttons.Save callback={handleSave} />
                <Buttons.Cancel callback={handleCancel} />
                <Buttons.Delete callback={handleRemove} disabled={disabled} />
            </ButtonGroup>
        )
    },
    Meta: function ({food, dispatch}) {
        const keys = [
            ['UPC','upc'],
            ['Description','description'],
            ['BrandOwner','brandOwner'],
            ['DataType','dataType'],
            ['DataSource','dataSource'],
            ['ServingSize','servingSize'],
            ['ServingSizeUnit','servingSizeUnit'],
        ];

        return (
            <InputGroup>
                {keys.map((key,i) => {
                    return <Formatter.InputItem key={i} title={key[0]} field={key[1]} 
                    obj={food} dispatch={dispatch} action={'food/update'} />
                })}
            </InputGroup>
        )
    },
    Nutri: function ({food, dispatch}) {
        const keys = [
            ['Calories','calories'],
            ['Protein','protein'],
            ['Carbohydrates','carbohydrates'],
            ['Fat','fat'],
        ];

        useEffect(
            () => {
                dispatch({type:'food/calories',payload:{}})
            },
            [food.labelNutrients.protein,food.labelNutrients.carbohydrates,food.labelNutrients.fat]
        )

        return (
            <InputGroup>
                {keys.map((key,i) => {
                    return <Formatter.InputItem key={i} title={key[0]} field={key[1]} 
                    obj={food['labelNutrients']} dispatch={dispatch} action={'food_nutri/update'} />
                })}
            </InputGroup>
        )
    },
    NutriExtended: function ({food, dispatch}) {
        const keys = [
            ['saturatedFat','saturatedFat'],
            ['transFat','transFat'],
            ['cholesterol','cholesterol'],
            ['sodium','sodium'],
            ['fiber','fiber'],
            ['sugars','sugars'],
            ['calcium','calcium'],
            ['iron','iron'],
            ['potassium','potassium'],
            ['addedSugar','addedSugar'],
        ];

        return (
            <InputGroup>
                {keys.map((key,i) => {
                    return <Formatter.InputItem key={i} title={key[0]} field={key[1]} 
                    obj={food['labelNutrients']} dispatch={dispatch} action={'food_nutri/update'} />
                })}
            </InputGroup>
        )
    },
}

export default Food