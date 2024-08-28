import React, { useCallback } from 'react';
import clsx from 'clsx';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({ name: 'MUIDataTableBodyCell' })(theme => ({
  root: {},
  cellHide: {
    display: 'none !important',
  },
  simpleHeader: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block !important',
      fontWeight: 'bold !important',
      width: '100% !important',
      boxSizing: 'border-box !important',
    },
  },
  simpleCell: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block !important',
      width: '100% !important',
      boxSizing: 'border-box !important',
    },
  },
  stackedHeader: {
    verticalAlign: 'top !important',
  },
  stackedCommon: {
    [theme.breakpoints.down('md')]: {
      display: 'inline-block !important',
      fontSize: '16px !important',
      height: 'aut !importanto',
      width: 'calc(50%) !important',
      boxSizing: 'border-box !important',
      '&:last-child': {
        borderBottom: 'none !important',
      },
      '&:nth-last-of-type(2)': {
        borderBottom: 'none !important',
      },
    },
  },
  stackedCommonAlways: {
    display: 'inline-block !important',
    fontSize: '16px !important',
    height: 'auto !important',
    width: 'calc(50%) !important',
    boxSizing: 'border-box !important',
    '&:last-child': {
      borderBottom: 'none !important',
    },
    '&:nth-last-of-type(2)': {
      borderBottom: 'none !important',
    },
  },
  stackedParent: {
    [theme.breakpoints.down('md')]: {
      display: 'inline-block !important',
      fontSize: '16px !important',
      height: 'auto !important',
      width: 'calc(100%) !important',
      boxSizing: 'border-box !important',
    },
  },
  stackedParentAlways: {
    display: 'inline-block !important',
    fontSize: '16px !important',
    height: 'auto !important',
    width: 'calc(100%) !important',
    boxSizing: 'border-box !important',
  },
  cellStackedSmall: {
    [theme.breakpoints.down('md')]: {
      width: '50% !important',
      boxSizing: 'border-box !important',
    },
  },
  responsiveStackedSmall: {
    [theme.breakpoints.down('md')]: {
      width: '50% !important',
      boxSizing: 'border-box !important',
    },
  },
  responsiveStackedSmallParent: {
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
      boxSizing: 'border-box !important',
    },
  },
}));

function TableBodyCell(props) {
  const { classes } = useStyles();
  const {
    children,
    colIndex,
    columnHeader,
    options,
    dataIndex,
    rowIndex,
    className,
    print,
    tableId,
    ...otherProps
  } = props;
  const onCellClick = options.onCellClick;

  const handleClick = useCallback(
    event => {
      onCellClick(children, { colIndex, rowIndex, dataIndex, event });
    },
    [onCellClick, children, colIndex, rowIndex, dataIndex],
  );

  // Event listeners. Avoid attaching them if they're not necessary.
  let methods = {};
  if (onCellClick) {
    methods.onClick = handleClick;
  }

  let cells = [
    <div
      key={1}
      className={clsx(
        {
          lastColumn: colIndex === 2,
          [classes.root]: true,
          [classes.cellHide]: true,
          [classes.stackedHeader]: true,
          [classes.stackedCommon]:
            options.responsive === 'vertical' ||
            options.responsive === 'stacked' ||
            options.responsive === 'stackedFullWidth',
          [classes.stackedCommonAlways]: options.responsive === 'verticalAlways',
          [classes.cellStackedSmall]:
            options.responsive === 'stacked' ||
            (options.responsive === 'stackedFullWidth' &&
              (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleHeader]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}>
      {columnHeader}
    </div>,
    <div
      key={2}
      className={clsx(
        {
          [classes.root]: true,
          [classes.stackedCommon]:
            options.responsive === 'vertical' ||
            options.responsive === 'stacked' ||
            options.responsive === 'stackedFullWidth',
          [classes.stackedCommonAlways]: options.responsive === 'verticalAlways',
          [classes.responsiveStackedSmall]:
            options.responsive === 'stacked' ||
            (options.responsive === 'stackedFullWidth' &&
              (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleCell]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}>
      {typeof children === 'function' ? children(dataIndex, rowIndex) : children}
    </div>,
  ];

  var innerCells;
  if (
    ['standard', 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth'].indexOf(options.responsive) !== -1
  ) {
    innerCells = cells.slice(1, 2);
  } else {
    innerCells = cells;
  }

  return (
    <TableCell
      {...methods}
      data-colindex={colIndex}
      data-tableid={tableId}
      className={clsx(
        {
          [classes.root]: true,
          [classes.stackedParent]:
            options.responsive === 'vertical' ||
            options.responsive === 'stacked' ||
            options.responsive === 'stackedFullWidth',
          [classes.stackedParentAlways]: options.responsive === 'verticalAlways',
          [classes.responsiveStackedSmallParent]:
            options.responsive === 'vertical' ||
            options.responsive === 'stacked' ||
            (options.responsive === 'stackedFullWidth' &&
              (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleCell]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}
      {...otherProps}>
      {innerCells}
    </TableCell>
  );
}

export default TableBodyCell;
