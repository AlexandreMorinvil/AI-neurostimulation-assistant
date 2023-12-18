import { Session } from '@class/session/Session';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { DataTable as ReactNativeDataTable } from 'react-native-paper';
import { boxStyles, textStyles } from 'src/styles';
import { databaseService } from 'src/services/databaseService';
import { sessionService } from 'src/services/sessionService';

export const DataTable = () => {

  /**
   * Constants
   */
  const locale: string = 'EN-GB';
  const dateFormmatingOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const NO_VALUE: string = '-';

  /**
   * States
  */
  const getSortedSessionsList = (): Array<Session> => {
    return databaseService.getAllSessions().sort((a: Session, b: Session) => {
      return a.dateStart.getTime() - b.dateStart.getTime();
    }).reverse();
  }

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState<Array<number>>([5, 10]);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(numberOfItemsPerPageList[0]);
  const [sessions, setSessions] = useState<Array<Session>>(getSortedSessionsList());

  /**
   * Variables
   */
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sessions.length);

  /**
   * Functions
   */
  const updateList = () => {
    setSessions(getSortedSessionsList());
  }

  const getFormattedId = (session: Session): string => {
    return session.id.toString();
  }

  const getFormattedStartDate = (session: Session): string => {
    return session.dateStart.toLocaleDateString(locale, dateFormmatingOptions);
  }

  const getFormattedCompletionDate = (session: Session): string => {
    return session.dateCompletion ?
      session.dateCompletion.toLocaleDateString(locale, dateFormmatingOptions) :
      NO_VALUE;
  }

  const getFormattedIsCompleted = (session: Session): string => {
    if (sessionService.correspondsToActiveSession(session)) return 'Active';
    return session.isSessionConcluded ? 'Complete' : 'Incomplete';
  }

  /**
   * Effects
   */
  useEffect(() => {
    updateList();
    const subscription = databaseService.subscribeToSessions(() => { updateList() });
    return () => { subscription.unsubscribe() };
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  /**
   * Render
   */
  return (
    <ReactNativeDataTable>
      <ReactNativeDataTable.Header style={boxStyles.contentContainerRow}>
        <ReactNativeDataTable.Title>
          <Text style={textStyles.cellText}>ID</Text>
        </ReactNativeDataTable.Title>
        <ReactNativeDataTable.Title>
          <Text style={textStyles.cellText}>Start</Text>
        </ReactNativeDataTable.Title>
        <ReactNativeDataTable.Title>
          <Text style={textStyles.cellText}>Completion</Text>
        </ReactNativeDataTable.Title>
        <ReactNativeDataTable.Title>
          <Text style={textStyles.cellText}>Status</Text>
        </ReactNativeDataTable.Title>
      </ReactNativeDataTable.Header>

      {sessions.slice(from, to).map((session) => (
        <ReactNativeDataTable.Row
          style={boxStyles.contentContainerRow}
          key={session.id.toString()}
        >
          <ReactNativeDataTable.Cell>
            <Text style={textStyles.cellText}>{getFormattedId(session)}</Text>
          </ReactNativeDataTable.Cell>
          <ReactNativeDataTable.Cell>
            <Text style={textStyles.cellText}>{getFormattedStartDate(session)}</Text>
          </ReactNativeDataTable.Cell>
          <ReactNativeDataTable.Cell>
            <Text style={textStyles.cellText}>{getFormattedCompletionDate(session)}</Text>
          </ReactNativeDataTable.Cell>
          <ReactNativeDataTable.Cell>
            <Text style={textStyles.cellText}>{getFormattedIsCompleted(session)}</Text>
          </ReactNativeDataTable.Cell>
        </ReactNativeDataTable.Row>
      ))}

      <ReactNativeDataTable.Pagination
        style={[boxStyles.contentContainerBottomRow]}
        page={page}
        numberOfPages={Math.ceil(sessions.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${sessions.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </ReactNativeDataTable>
  );
};
