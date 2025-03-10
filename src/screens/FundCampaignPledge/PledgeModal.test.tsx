import type { ApolloLink } from '@apollo/client';
import { MockedProvider } from '@apollo/react-testing';
import { LocalizationProvider } from '@mui/x-date-pickers';
import type { RenderResult } from '@testing-library/react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'state/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import i18nForTest from '../../utils/i18nForTest';
import { PLEDGE_MODAL_MOCKS } from './PledgesMocks';
import { StaticMockLink } from 'utils/StaticMockLink';
import { toast } from 'react-toastify';
import type { InterfacePledgeModal } from './PledgeModal';
import PledgeModal from './PledgeModal';
import React from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@mui/x-date-pickers/DateTimePicker', () => {
  return {
    DateTimePicker: jest.requireActual(
      '@mui/x-date-pickers/DesktopDateTimePicker',
    ).DesktopDateTimePicker,
  };
});

const link1 = new StaticMockLink(PLEDGE_MODAL_MOCKS);
const translations = JSON.parse(
  JSON.stringify(i18nForTest.getDataByLanguage('en')?.translation.pledges),
);

const pledgeProps: InterfacePledgeModal[] = [
  {
    isOpen: true,
    hide: jest.fn(),
    pledge: {
      _id: '1',
      amount: 100,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      users: [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          image: undefined,
        },
      ],
    },
    refetchPledge: jest.fn(),
    campaignId: 'campaignId',
    orgId: 'orgId',
    endDate: new Date(),
    mode: 'create',
  },
  {
    isOpen: true,
    hide: jest.fn(),
    pledge: {
      _id: '1',
      amount: 100,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      users: [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          image: undefined,
        },
      ],
    },
    refetchPledge: jest.fn(),
    campaignId: 'campaignId',
    orgId: 'orgId',
    endDate: new Date(),
    mode: 'edit',
  },
];
const renderPledgeModal = (
  link: ApolloLink,
  props: InterfacePledgeModal,
): RenderResult => {
  return render(
    <MockedProvider link={link} addTypename={false}>
      <Provider store={store}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <I18nextProvider i18n={i18nForTest}>
              <PledgeModal {...props} />
            </I18nextProvider>
          </LocalizationProvider>
        </BrowserRouter>
      </Provider>
    </MockedProvider>,
  );
};

describe('PledgeModal', () => {
  beforeAll(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ orgId: 'orgId', fundCampaignId: 'fundCampaignId' }),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });
  it('should populate form fields with correct values in edit mode', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    await waitFor(() =>
      expect(screen.getByText(translations.editPledge)).toBeInTheDocument(),
    );
    expect(screen.getByTestId('pledgerSelect')).toHaveTextContent('John Doe');
    expect(screen.getByLabelText('Start Date')).toHaveValue('01/01/2024');
    expect(screen.getByLabelText('End Date')).toHaveValue('10/01/2024');
    expect(screen.getByLabelText('Currency')).toHaveTextContent('USD ($)');
    expect(screen.getByLabelText('Amount')).toHaveValue('100');
  });

  it('should update pledgeAmount when input value changes', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const amountInput = screen.getByLabelText('Amount');
    expect(amountInput).toHaveValue('100');
    fireEvent.change(amountInput, { target: { value: '200' } });
    expect(amountInput).toHaveValue('200');
  });

  it('should not update pledgeAmount when input value is less than or equal to 0', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const amountInput = screen.getByLabelText('Amount');
    expect(amountInput).toHaveValue('100');
    fireEvent.change(amountInput, { target: { value: '-10' } });
    expect(amountInput).toHaveValue('100');
  });

  it('should update pledgeStartDate when a new date is selected', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const startDateInput = screen.getByLabelText('Start Date');
    fireEvent.change(startDateInput, { target: { value: '02/01/2024' } });
    expect(startDateInput).toHaveValue('02/01/2024');
    expect(pledgeProps[1].pledge?.startDate).toEqual('2024-01-01');
  });

  it('pledgeStartDate onChange when its null', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const startDateInput = screen.getByLabelText('Start Date');
    fireEvent.change(startDateInput, { target: { value: null } });
    expect(pledgeProps[1].pledge?.startDate).toEqual('2024-01-01');
  });

  it('should update pledgeEndDate when a new date is selected', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const startDateInput = screen.getByLabelText('End Date');
    fireEvent.change(startDateInput, { target: { value: '02/01/2024' } });
    expect(startDateInput).toHaveValue('02/01/2024');
    expect(pledgeProps[1].pledge?.endDate).toEqual('2024-01-10');
  });

  it('pledgeEndDate onChange when its null', async () => {
    renderPledgeModal(link1, pledgeProps[1]);
    const endDateInput = screen.getByLabelText('End Date');
    fireEvent.change(endDateInput, { target: { value: null } });
    expect(pledgeProps[1].pledge?.endDate).toEqual('2024-01-10');
  });

  it('should create pledge', async () => {
    renderPledgeModal(link1, pledgeProps[0]);

    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByLabelText('Start Date'), {
      target: { value: '02/01/2024' },
    });
    fireEvent.change(screen.getByLabelText('End Date'), {
      target: { value: '02/01/2024' },
    });

    expect(screen.getByLabelText('Amount')).toHaveValue('200');
    expect(screen.getByLabelText('Start Date')).toHaveValue('02/01/2024');
    expect(screen.getByLabelText('End Date')).toHaveValue('02/01/2024');
    expect(screen.getByTestId('submitPledgeBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submitPledgeBtn'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
      expect(pledgeProps[0].refetchPledge).toHaveBeenCalled();
      expect(pledgeProps[0].hide).toHaveBeenCalled();
    });
  });
});
