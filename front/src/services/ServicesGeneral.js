import axiosClient from '../utils/axiosClient';

const EndpointDC = '/drivercars';
export const getDriverCars = () => { return axiosClient.get(EndpointDC) };
export const createDriverCar = (data) => { return axiosClient.post(EndpointDC, data) };
export const updateDriverCar = (id, data) => { return axiosClient.put(`${EndpointDC}/${id}`, data) };
export const deleteDriverCar = (id) => { return axiosClient.delete(`${EndpointDC}/${id}`) };
export const getDriverCarsID = (idCar) => { return axiosClient.get(`${EndpointDC}/${idCar}`) };

const EndpointEX = '/expenses';
export const getExpenses = () => { return axiosClient.get(EndpointEX) };
export const createExpense = (data) => { return axiosClient.post(EndpointEX, data) };
export const updateExpense = (id, data) => { return axiosClient.put(`${EndpointEX}/${id}`, data) };
export const deleteExpense = (id) => { return axiosClient.delete(`${EndpointEX}/${id}`) };

const EndpointFC = '/fixedcosts';
export const getFixedCosts = () => { return axiosClient.get(EndpointFC) };
export const createFixedCost = (data) => { return axiosClient.post(EndpointFC, data) };
export const updateFixedCost = (id, data) => { return axiosClient.put(`${EndpointFC}/${id}`, data) };
export const deleteFixedCost = (id) => { return axiosClient.delete(`${EndpointFC}/${id}`) };

const EndpointIC = '/incomes';
export const getIncomes = () => { return axiosClient.get(EndpointIC) };
export const createIncome = (data) => { return axiosClient.post(EndpointIC, data) };
export const updateIncome = (id, data) => { return axiosClient.put(`${EndpointIC}/${id}`, data)};
export const deleteIncome = (id) => { return axiosClient.delete(`${EndpointIC}/${id}`) };

const EndpointRM = '/reminders';
export const getReminders = () => { return axiosClient.get(EndpointRM) };
export const createReminder = (data) => { return axiosClient.post(EndpointRM, data) };
export const updateReminder = (id, data) => { return axiosClient.put(`${EndpointRM}/${id}`, data) };
export const deleteReminder = (id) => { return axiosClient.delete(`${EndpointRM}/${id}`)};