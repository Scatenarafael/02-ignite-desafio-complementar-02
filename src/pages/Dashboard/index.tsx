import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodObj, ModalSubitData, StateProps } from '../../types';

function Dashboard() {

  const [state, setState] = useState<StateProps>({
    modalOpen: false,
    editModalOpen: false,
    editingFood: {
      id: 0,
      name: '',
      description: '',
      price: '',
      available: false,
      image: ''
    },
    foods: []
  });

  useEffect(() => {
    handleGetFood()
  }, [])

  const handleGetFood = async () => {
    const response = await api.get('/foods');

    setState({
      ...state,
      foods: response.data
    });
  }

  const handleAddFood = async (food: ModalSubitData) => {
    const { foods } = state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setState(
        {
          ...state,
          foods: [...foods, response.data]
        });
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodObj) => {
    const { foods, editingFood } = state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setState(
        {
          ...state,
          foods: foodsUpdated
        });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    const { foods } = state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setState(
      {
        ...state,
        foods: foodsFiltered
      });
  }

  const toggleModal = () => {
    const { modalOpen } = state;
    console.log('Toggle');
    setState(
      {
        ...state,
        modalOpen: !modalOpen
      });
  }

  const toggleEditModal = () => {
    const { editModalOpen } = state;

    setState(
      {
        ...state,
        editModalOpen: !editModalOpen
      });
  }

  const handleEditFood = (food: FoodObj) => {
    setState(
      {
        ...state,
        editingFood: food,
        editModalOpen: true
      });
  }

  return (
    <>
      <Header toggleModal={toggleModal} />
      <ModalAddFood
        isOpen={state.modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={state.editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={state.editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {state.foods &&
          state.foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

