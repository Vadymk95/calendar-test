import { IEvent } from '../../../models/IEvents';
import { IUser } from '../../../models/IUser';
import { SetGuestsAction, EventActionEnum, SetEventsAction } from './types';
import { AppDispatch } from '../../index';
import Userservice from '../../../api/UserService';

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await Userservice.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (error) {
      console.log(error);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (error) {
      console.log(error);
    }
  },
  fetchEvents:
    (username: string) =>
    async (dispatch: AppDispatch) => {
      try {
        const events = localStorage.getItem('events') || '[]';
        const json = JSON.parse(events) as IEvent[];
        const currentUserEvents = json.filter(
          (ev) => ev.author === username || ev.guest === username
        );
        dispatch(EventActionCreators.setEvents(currentUserEvents));
      } catch (error) {
        console.log(error);
      }
    },
};
