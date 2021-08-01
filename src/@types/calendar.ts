import { EventInput } from '@fullcalendar/common';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type CalendarState = {
  isLoading: boolean;
  error: boolean;
  events: EventInput[];
  resourceEvents: EventInput[];
  assignmentEvents: EventInput[];
  isOpenModal: boolean;
  selectedEventId: null | string;
  selectedRange: null | { start: Date; end: Date };
};
