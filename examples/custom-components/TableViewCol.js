import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({ name: 'MUIDataTableViewCol' })(theme => ({
  root: {
    padding: '16px 24px 16px 24px !important',
    fontFamily: 'Roboto',
  },
  title: {
    marginLeft: '-7px !important',
    marginRight: '24px !important',
    fontSize: '14px !important',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'left !important',
    fontWeight: "500 !important",
  },
  formGroup: {
    marginTop: '8px !important',
  },
  formControl: {},
  checkbox: {
    padding: '0px !important',
    width: '32px !important',
    height: '32px !important',
  },
  checkboxRoot: {},
  checked: {},
  label: {
    fontSize: '15px !important',
    marginLeft: '8px !important',
    color: `${theme.palette.text.primary} !important`,
  },
}));

const TableViewCol = ({ columns, options, components = {}, onColumnUpdate, updateColumns }) => {
  const { classes } = useStyles();
  const textLabels = options.textLabels.viewColumns;
  const CheckboxComponent = components.Checkbox || Checkbox;

  const handleColChange = index => {
    onColumnUpdate(index);
  };

  const selectAll = () => {
    var newColumns = columns.map(col => {
      var newCol = Object.assign({}, col);
      newCol.display = 'true';
      return newCol;
    });
    updateColumns(newColumns);
  };

  return (
    <FormControl component={'fieldset'} className={classes.root} aria-label={textLabels.titleAria}>
      <Typography variant="caption" className={classes.title}>
        {textLabels.title}
      </Typography>
      <FormGroup className={classes.formGroup}>
        <Button onClick={selectAll}>Show All</Button>
        {columns.map((column, index) => {
          return (
            column.display !== 'excluded' &&
            column.viewColumns !== false && (
              <FormControlLabel
                key={index}
                classes={{
                  root: classes.formControl,
                  label: classes.label,
                }}
                control={
                  <CheckboxComponent
                    color="primary"
                    className={classes.checkbox}
                    classes={{
                      root: classes.checkboxRoot,
                      checked: classes.checked,
                    }}
                    onChange={() => handleColChange(index)}
                    checked={column.display === 'true'}
                    value={column.name}
                  />
                }
                label={column.label}
              />
            )
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

TableViewCol.propTypes = {
  /** Columns used to describe table */
  columns: PropTypes.array.isRequired,
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Callback to trigger View column update */
  onColumnUpdate: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object,
};

export default TableViewCol;
