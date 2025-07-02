import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import type { JobRequest } from '../types';
import { mockData } from '../mockData';
import { ContextMenu } from './ContextMenu';
import { Footer } from './Footer';

const columnHelper = createColumnHelper<JobRequest>();

const StatusBadge: React.FC<{ status: JobRequest['status'] }> = ({ status }) => {
  // Return empty div for empty status
  if (!status || status.length === 0) {
    return <div></div>;
  }

  const getStatusStyles = (status: JobRequest['status']) => {
    switch (status) {
        case 'In-progress':
        return {
            backgroundColor: '#FFF3D6',  // the second one takes precedence
            color: '#85640B',
            fontFamily: '"Work Sans", sans-serif',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '16px',
            borderRadius: '100px',

        };
      case 'Need to start':
        return {
          backgroundColor: '#E2E8F0',
          color: '#475569',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '16px'
        };
      case 'Complete':
        return {
          backgroundColor: '#D3F2E3',
          color: '#0A6E3D',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '16px'
        };
      case 'Blocked':
        return {
          backgroundColor: '#FFE1DE',
          color: '#C22219',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '16px'
        };
      default:
        return {
          backgroundColor: '#F8F9FA',
          color: '#6C757D',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '16px'
        };
    }
  };

  return (
    <span
      className="inline-block"
      style={{
        ...getStatusStyles(status),
        padding: '4px 12px',
        borderRadius: '12px'
      }}
    >
      {status}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: JobRequest['priority'] }> = ({ priority }) => {
  // Return empty div for empty priority
  if (!priority || priority.length === 0) {
    return <div></div>;
  }

  const getPriorityStyles = (priority: JobRequest['priority']) => {
    switch (priority) {
      case 'High':
        return {
          overflow: 'hidden',
          color: '#EF4D44',
          textAlign: 'center' as const,
          textOverflow: 'ellipsis',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px'
        };
      case 'Medium':
        return {
          overflow: 'hidden',
          color: '#C29210',
          textAlign: 'center' as const,
          textOverflow: 'ellipsis',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px'
        };
      case 'Low':
        return {
          overflow: 'hidden',
          color: '#1A8CFF',
          textAlign: 'center' as const,
          textOverflow: 'ellipsis',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px'
        };
      default:
        return {
          overflow: 'hidden',
          color: '#6C757D',
          textAlign: 'center' as const,
          textOverflow: 'ellipsis',
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px'
        };
    }
  };

  return (
    <span style={getPriorityStyles(priority)}>
      {priority}
    </span>
  );
};

interface SpreadsheetProps {
  searchQuery?: string;
  statusFilter?: string;
  priorityFilter?: string;
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  searchQuery = '',
  statusFilter = '',
  priorityFilter = ''
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const maxRow = mockData.length - 1;
    const maxCol = 9; // Number of columns minus 1 (including plus column)

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (row > 0) setSelectedCell({ row: row - 1, col });
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (row < maxRow) setSelectedCell({ row: row + 1, col });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (col > 0) setSelectedCell({ row, col: col - 1 });
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (col < maxCol) setSelectedCell({ row, col: col + 1 });
        break;
      case 'Escape':
        setSelectedCell(null);
        break;
    }
  };

  const handleRightClick = (event: React.MouseEvent, rowIndex: number, cellIndex: number) => {
    event.preventDefault();
    setSelectedCell({ row: rowIndex, col: cellIndex });
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleContextMenuAction = (action: string) => {
    console.log(`Context menu action: ${action} on cell (${selectedCell?.row}, ${selectedCell?.col})`);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'rowNumber',
        header: () => (
          <div className="flex items-center justify-center w-full h-full pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block', margin: 'auto' }}>
              <path d="M7.32461 1.92627C7.37593 1.65494 7.19758 1.39338 6.92625 1.34205C6.65492 1.29073 6.39336 1.46908 6.34203 1.74041L5.66264 5.33202L2.49977 5.3335C2.22362 5.33362 1.99987 5.55759 2 5.83373C2.00013 6.10987 2.22409 6.33362 2.50023 6.3335L5.47347 6.33211L4.84297 9.66526L1.8331 9.66667C1.55696 9.6668 1.33321 9.89076 1.33333 10.1669C1.33346 10.443 1.55743 10.6668 1.83357 10.6667L4.65379 10.6653L4.00868 14.0757C3.95736 14.3471 4.13571 14.6086 4.40704 14.66C4.67837 14.7113 4.93993 14.5329 4.99126 14.2616L5.67161 10.6649L9.32091 10.6632L8.67539 14.0757C8.62406 14.3471 8.80241 14.6086 9.07374 14.66C9.34508 14.7113 9.60664 14.5329 9.65796 14.2616L10.3387 10.6627L13.5002 10.6612C13.7764 10.6611 14.0001 10.4371 14 10.161C13.9999 9.88484 13.7759 9.66109 13.4998 9.66121L10.5279 9.6626L11.1584 6.32945L14.1669 6.32804C14.443 6.32792 14.6668 6.10395 14.6667 5.82781C14.6665 5.55167 14.4426 5.32791 14.1664 5.32804L11.3476 5.32936L11.9913 1.92627C12.0426 1.65494 11.8643 1.39338 11.593 1.34205C11.3216 1.29073 11.0601 1.46908 11.0087 1.74041L10.3298 5.32984L6.68047 5.33154L7.32461 1.92627ZM6.49129 6.33163L10.1406 6.32993L9.51009 9.66308L5.86079 9.66478L6.49129 6.33163Z" fill="#AFAFAF"/>
              <path d="M7.32461 1.92627C7.37593 1.65494 7.19758 1.39338 6.92625 1.34205C6.65492 1.29073 6.39336 1.46908 6.34203 1.74041L5.66264 5.33202L2.49977 5.3335C2.22362 5.33362 1.99987 5.55759 2 5.83373C2.00013 6.10987 2.22409 6.33362 2.50023 6.3335L5.47347 6.33211L4.84297 9.66526L1.8331 9.66667C1.55696 9.6668 1.33321 9.89076 1.33333 10.1669C1.33346 10.443 1.55743 10.6668 1.83357 10.6667L4.65379 10.6653L4.00868 14.0757C3.95736 14.3471 4.13571 14.6086 4.40704 14.66C4.67837 14.7113 4.93993 14.5329 4.99126 14.2616L5.67161 10.6649L9.32091 10.6632L8.67539 14.0757C8.62406 14.3471 8.80241 14.6086 9.07374 14.66C9.34508 14.7113 9.60664 14.5329 9.65796 14.2616L10.3387 10.6627L13.5002 10.6612C13.7764 10.6611 14.0001 10.4371 14 10.161C13.9999 9.88484 13.7759 9.66109 13.4998 9.66121L10.5279 9.6626L11.1584 6.32945L14.1669 6.32804C14.443 6.32792 14.6668 6.10395 14.6667 5.82781C14.6665 5.55167 14.4426 5.32791 14.1664 5.32804L11.3476 5.32936L11.9913 1.92627C12.0426 1.65494 11.8643 1.39338 11.593 1.34205C11.3216 1.29073 11.0601 1.46908 11.0087 1.74041L10.3298 5.32984L6.68047 5.33154L7.32461 1.92627ZM6.49129 6.33163L10.1406 6.32993L9.51009 9.66308L5.86079 9.66478L6.49129 6.33163Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M7.32461 1.92627C7.37593 1.65494 7.19758 1.39338 6.92625 1.34205C6.65492 1.29073 6.39336 1.46908 6.34203 1.74041L5.66264 5.33202L2.49977 5.3335C2.22362 5.33362 1.99987 5.55759 2 5.83373C2.00013 6.10987 2.22409 6.33362 2.50023 6.3335L5.47347 6.33211L4.84297 9.66526L1.8331 9.66667C1.55696 9.6668 1.33321 9.89076 1.33333 10.1669C1.33346 10.443 1.55743 10.6668 1.83357 10.6667L4.65379 10.6653L4.00868 14.0757C3.95736 14.3471 4.13571 14.6086 4.40704 14.66C4.67837 14.7113 4.93993 14.5329 4.99126 14.2616L5.67161 10.6649L9.32091 10.6632L8.67539 14.0757C8.62406 14.3471 8.80241 14.6086 9.07374 14.66C9.34508 14.7113 9.60664 14.5329 9.65796 14.2616L10.3387 10.6627L13.5002 10.6612C13.7764 10.6611 14.0001 10.4371 14 10.161C13.9999 9.88484 13.7759 9.66109 13.4998 9.66121L10.5279 9.6626L11.1584 6.32945L14.1669 6.32804C14.443 6.32792 14.6668 6.10395 14.6667 5.82781C14.6665 5.55167 14.4426 5.32791 14.1664 5.32804L11.3476 5.32936L11.9913 1.92627C12.0426 1.65494 11.8643 1.39338 11.593 1.34205C11.3216 1.29073 11.0601 1.46908 11.0087 1.74041L10.3298 5.32984L6.68047 5.33154L7.32461 1.92627ZM6.49129 6.33163L10.1406 6.32993L9.51009 9.66308L5.86079 9.66478L6.49129 6.33163Z" fill="white" fillOpacity="0.16"/>
            </svg>
          </div>
        ),
        cell: (info) => (
          <div
            className="w-8 text-center text-gray-400"
            style={{
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '12px'
            }}
          >
            {info.row.index + 1}
          </div>
        ),
      }),
      columnHelper.accessor('jobRequest', {
        size: 200,
        header: () => (
          <div className="flex items-center space-x-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="#AFAFAF"/>
              <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="white" fillOpacity="0.16"/>
            </svg>
            <span>Job Request</span>
          </div>
        ),
          cell: (info) => (
              <div
                  title={info.getValue()}
                  style={{
                      overflow: 'hidden',
                      color: '#121212',
                      textOverflow: 'ellipsis',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '16px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      flex: '1 0 0'
                  }}
              >
                  {info.getValue()}
              </div>
          ),
      }),
      columnHelper.accessor('submitted', {
        header: () => (
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="#AFAFAF"/>
              <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="white" fillOpacity="0.16"/>
            </svg>
            <span>Submitted</span>
          </div>
        ),
        cell: (info) => (
          <div style={{
            display: 'flex',
            height: '24px',
            padding: '0px 2px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            alignSelf: 'stretch'
          }}>
            <span style={{
              overflow: 'hidden',
              color: '#121212',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px'
            }}>
              {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: () => (
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z" fill="#AFAFAF"/>
              <path d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z" fill="white" fillOpacity="0.16"/>
            </svg>
            <span>Status</span>
          </div>
        ),
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor('submitter', {
        header: () => (
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.8361 9.33327C12.6641 9.33327 13.3353 10.0045 13.3353 10.8325V11.4448C13.3353 11.8271 13.2159 12.1998 12.9936 12.5108C11.963 13.9529 10.2802 14.6674 7.99998 14.6674C5.71933 14.6674 4.03736 13.9526 3.00925 12.5097C2.78794 12.1991 2.66901 11.8272 2.66901 11.4458V10.8325C2.66901 10.0045 3.34024 9.33327 4.16826 9.33327H11.8361ZM7.99998 1.33641C9.84093 1.33641 11.3333 2.82879 11.3333 4.66974C11.3333 6.51069 9.84093 8.00308 7.99998 8.00308C6.15903 8.00308 4.66665 6.51069 4.66665 4.66974C4.66665 2.82879 6.15903 1.33641 7.99998 1.33641Z" fill="#AFAFAF"/>
              <path d="M11.8361 9.33327C12.6641 9.33327 13.3353 10.0045 13.3353 10.8325V11.4448C13.3353 11.8271 13.2159 12.1998 12.9936 12.5108C11.963 13.9529 10.2802 14.6674 7.99998 14.6674C5.71933 14.6674 4.03736 13.9526 3.00925 12.5097C2.78794 12.1991 2.66901 11.8272 2.66901 11.4458V10.8325C2.66901 10.0045 3.34024 9.33327 4.16826 9.33327H11.8361ZM7.99998 1.33641C9.84093 1.33641 11.3333 2.82879 11.3333 4.66974C11.3333 6.51069 9.84093 8.00308 7.99998 8.00308C6.15903 8.00308 4.66665 6.51069 4.66665 4.66974C4.66665 2.82879 6.15903 1.33641 7.99998 1.33641Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M11.8361 9.33327C12.6641 9.33327 13.3353 10.0045 13.3353 10.8325V11.4448C13.3353 11.8271 13.2159 12.1998 12.9936 12.5108C11.963 13.9529 10.2802 14.6674 7.99998 14.6674C5.71933 14.6674 4.03736 13.9526 3.00925 12.5097C2.78794 12.1991 2.66901 11.8272 2.66901 11.4458V10.8325C2.66901 10.0045 3.34024 9.33327 4.16826 9.33327H11.8361ZM7.99998 1.33641C9.84093 1.33641 11.3333 2.82879 11.3333 4.66974C11.3333 6.51069 9.84093 8.00308 7.99998 8.00308C6.15903 8.00308 4.66665 6.51069 4.66665 4.66974C4.66665 2.82879 6.15903 1.33641 7.99998 1.33641Z" fill="white" fillOpacity="0.16"/>
            </svg>
            <span>Submitter</span>
          </div>
        ),
        cell: (info) => (
          <div style={{
            display: 'flex',
            height: '24px',
            padding: '0px 8px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '4px',
            alignSelf: 'stretch'
          }}>
            <span style={{
              overflow: 'hidden',
              color: '#121212',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px'
            }}>
              {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('url', {
        header: () => (
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.93615 11.0006H10.0638C9.65051 13.1815 8.82291 14.666 7.99998 14.666C7.20198 14.666 6.39959 13.2701 5.97485 11.1969L5.93615 11.0006H10.0638H5.93615ZM2.04385 11.0007L4.91427 11.0005C5.15745 12.3887 5.56964 13.5697 6.10906 14.3962C4.40051 13.8916 2.97807 12.7217 2.14141 11.1866L2.04385 11.0007ZM11.0857 11.0005L13.9561 11.0007C13.1352 12.6271 11.6678 13.8714 9.89157 14.3959C10.3946 13.6242 10.7871 12.5442 11.0348 11.2753L11.0857 11.0005L13.9561 11.0007L11.0857 11.0005ZM11.2876 6.66723L14.5343 6.66682C14.6218 7.0977 14.6677 7.54366 14.6677 8.00035C14.6677 8.69723 14.5608 9.36914 14.3625 10.0006H11.2274C11.2976 9.36221 11.3343 8.69149 11.3343 8.00035C11.3343 7.69747 11.3273 7.39851 11.3134 7.10447L11.2876 6.66723L14.5343 6.66682L11.2876 6.66723ZM1.46565 6.66682L4.71233 6.66723C4.6815 7.10053 4.66561 7.54603 4.66561 8.00035C4.66561 8.55326 4.68915 9.0931 4.73451 9.61379L4.77259 10.0006H1.6375C1.43919 9.36914 1.33228 8.69723 1.33228 8.00035C1.33228 7.54366 1.37819 7.0977 1.46565 6.66682ZM5.71697 6.66685H10.283C10.3165 7.09727 10.3343 7.54317 10.3343 8.00035C10.3343 8.55878 10.3077 9.10037 10.2584 9.6175L10.2173 10.0006H5.78261C5.70725 9.37011 5.66561 8.69839 5.66561 8.00035C5.66561 7.65746 5.67566 7.32093 5.69481 6.9925L5.71697 6.66685H10.283H5.71697ZM9.96282 1.71806L9.8909 1.60458C11.9031 2.19856 13.5191 3.7163 14.2479 5.66679L11.1873 5.66699C10.977 4.05571 10.5497 2.67192 9.96282 1.71806L9.8909 1.60458L9.96282 1.71806ZM6.02782 1.62912L6.10901 1.6046C5.52184 2.50428 5.08543 3.82402 4.85366 5.37376L4.81262 5.66699L1.75203 5.66679C2.471 3.74262 4.0534 2.23959 6.02782 1.62912L6.10901 1.6046L6.02782 1.62912ZM7.99998 1.33466C8.87917 1.33466 9.7637 3.02916 10.1426 5.45695L10.1739 5.66682H5.8261C6.1857 3.12737 7.09566 1.33466 7.99998 1.33466Z" fill="#AFAFAF"/>
              <path d="M5.93615 11.0006H10.0638C9.65051 13.1815 8.82291 14.666 7.99998 14.666C7.20198 14.666 6.39959 13.2701 5.97485 11.1969L5.93615 11.0006H10.0638H5.93615ZM2.04385 11.0007L4.91427 11.0005C5.15745 12.3887 5.56964 13.5697 6.10906 14.3962C4.40051 13.8916 2.97807 12.7217 2.14141 11.1866L2.04385 11.0007ZM11.0857 11.0005L13.9561 11.0007C13.1352 12.6271 11.6678 13.8714 9.89157 14.3959C10.3946 13.6242 10.7871 12.5442 11.0348 11.2753L11.0857 11.0005L13.9561 11.0007L11.0857 11.0005ZM11.2876 6.66723L14.5343 6.66682C14.6218 7.0977 14.6677 7.54366 14.6677 8.00035C14.6677 8.69723 14.5608 9.36914 14.3625 10.0006H11.2274C11.2976 9.36221 11.3343 8.69149 11.3343 8.00035C11.3343 7.69747 11.3273 7.39851 11.3134 7.10447L11.2876 6.66723L14.5343 6.66682L11.2876 6.66723ZM1.46565 6.66682L4.71233 6.66723C4.6815 7.10053 4.66561 7.54603 4.66561 8.00035C4.66561 8.55326 4.68915 9.0931 4.73451 9.61379L4.77259 10.0006H1.6375C1.43919 9.36914 1.33228 8.69723 1.33228 8.00035C1.33228 7.54366 1.37819 7.0977 1.46565 6.66682ZM5.71697 6.66685H10.283C10.3165 7.09727 10.3343 7.54317 10.3343 8.00035C10.3343 8.55878 10.3077 9.10037 10.2584 9.6175L10.2173 10.0006H5.78261C5.70725 9.37011 5.66561 8.69839 5.66561 8.00035C5.66561 7.65746 5.67566 7.32093 5.69481 6.9925L5.71697 6.66685H10.283H5.71697ZM9.96282 1.71806L9.8909 1.60458C11.9031 2.19856 13.5191 3.7163 14.2479 5.66679L11.1873 5.66699C10.977 4.05571 10.5497 2.67192 9.96282 1.71806L9.8909 1.60458L9.96282 1.71806ZM6.02782 1.62912L6.10901 1.6046C5.52184 2.50428 5.08543 3.82402 4.85366 5.37376L4.81262 5.66699L1.75203 5.66679C2.471 3.74262 4.0534 2.23959 6.02782 1.62912L6.10901 1.6046L6.02782 1.62912ZM7.99998 1.33466C8.87917 1.33466 9.7637 3.02916 10.1426 5.45695L10.1739 5.66682H5.8261C6.1857 3.12737 7.09566 1.33466 7.99998 1.33466Z" fill="black" fillOpacity="0.7" style={{mixBlendMode: 'hue'}}/>
              <path d="M5.93615 11.0006H10.0638C9.65051 13.1815 8.82291 14.666 7.99998 14.666C7.20198 14.666 6.39959 13.2701 5.97485 11.1969L5.93615 11.0006H10.0638H5.93615ZM2.04385 11.0007L4.91427 11.0005C5.15745 12.3887 5.56964 13.5697 6.10906 14.3962C4.40051 13.8916 2.97807 12.7217 2.14141 11.1866L2.04385 11.0007ZM11.0857 11.0005L13.9561 11.0007C13.1352 12.6271 11.6678 13.8714 9.89157 14.3959C10.3946 13.6242 10.7871 12.5442 11.0348 11.2753L11.0857 11.0005L13.9561 11.0007L11.0857 11.0005ZM11.2876 6.66723L14.5343 6.66682C14.6218 7.0977 14.6677 7.54366 14.6677 8.00035C14.6677 8.69723 14.5608 9.36914 14.3625 10.0006H11.2274C11.2976 9.36221 11.3343 8.69149 11.3343 8.00035C11.3343 7.69747 11.3273 7.39851 11.3134 7.10447L11.2876 6.66723L14.5343 6.66682L11.2876 6.66723ZM1.46565 6.66682L4.71233 6.66723C4.6815 7.10053 4.66561 7.54603 4.66561 8.00035C4.66561 8.55326 4.68915 9.0931 4.73451 9.61379L4.77259 10.0006H1.6375C1.43919 9.36914 1.33228 8.69723 1.33228 8.00035C1.33228 7.54366 1.37819 7.0977 1.46565 6.66682ZM5.71697 6.66685H10.283C10.3165 7.09727 10.3343 7.54317 10.3343 8.00035C10.3343 8.55878 10.3077 9.10037 10.2584 9.6175L10.2173 10.0006H5.78261C5.70725 9.37011 5.66561 8.69839 5.66561 8.00035C5.66561 7.65746 5.67566 7.32093 5.69481 6.9925L5.71697 6.66685H10.283H5.71697ZM9.96282 1.71806L9.8909 1.60458C11.9031 2.19856 13.5191 3.7163 14.2479 5.66679L11.1873 5.66699C10.977 4.05571 10.5497 2.67192 9.96282 1.71806L9.8909 1.60458L9.96282 1.71806ZM6.02782 1.62912L6.10901 1.6046C5.52184 2.50428 5.08543 3.82402 4.85366 5.37376L4.81262 5.66699L1.75203 5.66679C2.471 3.74262 4.0534 2.23959 6.02782 1.62912L6.10901 1.6046L6.02782 1.62912ZM7.99998 1.33466C8.87917 1.33466 9.7637 3.02916 10.1426 5.45695L10.1739 5.66682H5.8261C6.1857 3.12737 7.09566 1.33466 7.99998 1.33466Z" fill="white" fillOpacity="0.16"/>
            </svg>
            <span>URL</span>
          </div>
        ),
        cell: (info) => (
          <div
            style={{
              display: 'flex',
              height: '24px',
              padding: '0px 2px',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '4px',
              alignSelf: 'stretch',
              overflow: 'hidden'
            }}
          >
            <a
              href={info.getValue()}
              target="_blank"
              rel="noopener noreferrer"
              title={info.getValue()}
              style={{
                overflow: 'hidden',
                color: '#121212',
                textOverflow: 'ellipsis',
                fontFamily: '"Work Sans", sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '16px',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationSkipInk: 'none',
                textDecorationThickness: 'auto',
                textUnderlineOffset: 'auto',
                textUnderlinePosition: 'from-font',
                whiteSpace: 'nowrap',
                maxWidth: '120px'
              }}
            >
              {info.getValue()}
            </a>
          </div>
        ),
      }),
      columnHelper.accessor('assigned', {
        enableSorting: false,
        header: () => (
          <div className="flex items-center space-x-1" style={{ padding: '4px 8px' }}>
            <span style={{
              overflow: 'hidden',
              color: '#666C66',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '16px'
            }}>Assigned</span>
          </div>
        ),
        cell: (info) => (
          <div style={{
            display: 'flex',
            height: '24px',
            padding: '0px 8px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '4px',
            alignSelf: 'stretch'
          }}>
            <span style={{
              overflow: 'hidden',
              color: '#121212',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px'
            }}>
              {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('priority', {
        enableSorting: false,
        header: () => (
          <div className="flex items-center space-x-1" style={{ padding: '4px 8px' }}>
            <span style={{
              overflow: 'hidden',
              color: '#655C80',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '16px'
            }}>Priority</span>
          </div>
        ),
        cell: (info) => (
          <div style={{
            display: 'flex',
            height: '24px',
            padding: '0px 2px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            alignSelf: 'stretch'
          }}>
            <PriorityBadge priority={info.getValue()} />
          </div>
        ),
      }),
      columnHelper.accessor('dueDate', {
        enableSorting: false,
        header: () => (
          <div className="flex items-center space-x-1" style={{ padding: '4px 8px' }}>
            <span style={{
              overflow: 'hidden',
              color: '#655C80',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '16px'
            }}>Due Date</span>
          </div>
        ),
        cell: (info) => (
          <div style={{
            display: 'flex',
            height: '24px',
            padding: '0px 8px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '4px',
            alignSelf: 'stretch'
          }}>
            <span style={{
              overflow: 'hidden',
              color: '#121212',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px'
            }}>
              {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('estValue', {
        enableSorting: false,
        header: () => (
          <div className="flex items-center space-x-1" style={{ padding: '4px 8px' }}>
            <span style={{
              overflow: 'hidden',
              color: '#8C6C62',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '16px'
            }}>Est. Value</span>
          </div>
        ),
        cell: (info) => (
          <div
            style={{
              display: 'flex',
              height: '24px',
              padding: '0px 8px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '4px',
              alignSelf: 'stretch',
              overflow: 'hidden',
              color: '#121212',
              textOverflow: 'ellipsis',
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px'
            }}
          >
            {info.getValue()}
          </div>
        ),
      }),
      // Plus column
      columnHelper.display({
        id: 'addColumn',
        header: () => (
          <div className="flex items-center justify-center">
            {/* Empty - plus icon only in colored header above */}
          </div>
        ),
        cell: () => (
          <div className="h-full w-full">
            {/* Completely empty cell */}
          </div>
        ),
      }),
    ],
    []
  );

  // Filter data based on search query and filters
  const filteredData = useMemo(() => {
    let filtered = mockData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(item => item.priority === priorityFilter);
    }

    return filtered;
  }, [searchQuery, statusFilter, priorityFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div
      className="w-full h-full bg-white focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ fontFamily: '"Work Sans", sans-serif' }}
    >

      <div className="overflow-auto h-full">
        <table className="w-full bg-white" style={{
          fontFamily: 'Work Sans, sans-serif',
          borderCollapse: 'collapse',
          border: '1px solid #E5E7EB'
        }}>
          <thead className="sticky top-0 bg-white z-10">
            {/* Colored header sections */}
            <tr>
              <th className="w-12" style={{ height: '24px', backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }}></th>
              {/* Q3 Financial Overview - spans Job Request to Submitter only */}
                <th className="px-2 py-1 text-left" colSpan={4} style={{ backgroundColor: '#e8e4e4', height: '24px', border: '1px solid #E5E7EB' }}>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 px-2 py-1 rounded" style={{ backgroundColor: '#eeeeee' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M6.16667 4.66666C6.44281 4.66666 6.66667 4.89052 6.66667 5.16666C6.66667 5.4177 6.48166 5.62553 6.24055 5.66124L6.16667 5.66666H4.66667C3.378 5.66666 2.33333 6.71133 2.33333 8C2.33333 9.24264 3.30471 10.2584 4.52956 10.3294L4.66667 10.3333H6.16667C6.44281 10.3333 6.66667 10.5572 6.66667 10.8333C6.66667 11.0844 6.48166 11.2922 6.24055 11.3279L6.16667 11.3333H4.66667C2.82572 11.3333 1.33333 9.84095 1.33333 8C1.33333 6.21483 2.73664 4.75743 4.5003 4.67074L4.66667 4.66666H6.16667ZM11.3333 4.66666C13.1743 4.66666 14.6667 6.15905 14.6667 8C14.6667 9.78516 13.2634 11.2426 11.4997 11.3293L11.3333 11.3333H9.83333C9.55719 11.3333 9.33333 11.1095 9.33333 10.8333C9.33333 10.5823 9.51834 10.3745 9.75945 10.3388L9.83333 10.3333H11.3333C12.622 10.3333 13.6667 9.28866 13.6667 8C13.6667 6.75736 12.6953 5.74159 11.4704 5.67062L11.3333 5.66666H9.83333C9.55719 5.66666 9.33333 5.44281 9.33333 5.16666C9.33333 4.91563 9.51834 4.7078 9.75945 4.67209L9.83333 4.66666H11.3333ZM4.66667 7.5H11.3333C11.6095 7.5 11.8333 7.72385 11.8333 8C11.8333 8.25313 11.6452 8.46232 11.4012 8.49543L11.3333 8.5H4.66667C4.39052 8.5 4.16667 8.27614 4.16667 8C4.16667 7.74687 4.35477 7.53767 4.59882 7.50456L4.66667 7.5H11.3333H4.66667Z" fill="#1A8CFF"/>
                            </svg>
                            <span style={{
                              color: '#545454',
                              fontFamily: '"Work Sans", sans-serif',
                              fontSize: '12px',
                              fontWeight: '400',
                              lineHeight: '16px'
                            }}>Q3 Financial Overview</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.8337 3.45341C10.6663 3.67298 10.7085 3.98673 10.9281 4.15419C12.1203 5.06343 12.8333 6.47214 12.8333 8C12.8333 10.4907 10.9494 12.5413 8.52888 12.8047L8.97978 12.3536C9.17505 12.1583 9.17505 11.8417 8.97978 11.6464C8.80227 11.4689 8.5245 11.4528 8.32876 11.598L8.27268 11.6464L6.93934 12.9798C6.76183 13.1573 6.7457 13.4351 6.89093 13.6308L6.93934 13.6869L8.27268 15.0202C8.46794 15.2155 8.78452 15.2155 8.97978 15.0202C9.1573 14.8427 9.17343 14.5649 9.0282 14.3692L8.97978 14.3131L8.47963 13.8139C11.4769 13.57 13.8333 11.0602 13.8333 8C13.8333 6.15685 12.9721 4.45548 11.5345 3.35905C11.3149 3.19159 11.0012 3.23384 10.8337 3.45341ZM7.02022 0.979782C6.82496 1.17504 6.82496 1.49163 7.02022 1.68689L7.51972 2.18616C4.52273 2.4304 2.16667 4.94006 2.16667 8C2.16667 9.76297 2.95418 11.3983 4.28721 12.4994C4.50011 12.6753 4.81527 12.6452 4.99113 12.4323C5.16699 12.2194 5.13697 11.9043 4.92407 11.7284C3.81863 10.8153 3.16667 9.46147 3.16667 8C3.16667 5.50958 5.05022 3.45908 7.47047 3.19535L7.02022 3.64645C6.82496 3.84171 6.82496 4.15829 7.02022 4.35356C7.21549 4.54882 7.53207 4.54882 7.72733 4.35356L9.06066 3.02022C9.25593 2.82496 9.25593 2.50838 9.06066 2.31312L7.72733 0.979782C7.53207 0.78452 7.21549 0.78452 7.02022 0.979782Z" fill="#FA6736"/>
                        </svg>
                    </div>
                </th>
              {/* Empty cell above URL */}
              <th className="px-2 py-1" style={{ height: '24px', border: '1px solid #E5E7EB' }}></th>
              {/* ABC - only above Assigned */}
              <th className="px-2 py-1 text-center" style={{
                backgroundColor: '#D2E0D4',
                height: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M8.50001 2C8.77616 2 9.00001 2.22386 9.00001 2.5V6.33333H10.6636C11.6762 6.33333 12.497 7.15414 12.497 8.16667V12.2944L13.6467 11.1462C13.8421 10.9511 14.1587 10.9513 14.3538 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3503 13.8541C12.155 14.0492 11.8386 14.0491 11.6434 13.8539L9.64308 11.8536C9.44782 11.6583 9.44782 11.3417 9.64308 11.1464C9.83834 10.9512 10.1549 10.9512 10.3502 11.1464L11.497 12.2932V8.16667C11.497 7.70643 11.1239 7.33333 10.6636 7.33333H6.33328C5.87304 7.33333 5.49995 7.70643 5.49995 8.16667V12.2932L6.64673 11.1464C6.84199 10.9512 7.15858 10.9512 7.35384 11.1464C7.5491 11.3417 7.5491 11.6583 7.35384 11.8536L5.3535 13.8539C5.15824 14.0492 4.84166 14.0492 4.6464 13.8539L2.64602 11.8536C2.45076 11.6583 2.45076 11.3417 2.64602 11.1465C2.84128 10.9512 3.15786 10.9512 3.35312 11.1464L4.49995 12.2932V8.16667C4.49995 7.15414 5.32076 6.33333 6.33328 6.33333H8.00001V2.5C8.00001 2.22386 8.22387 2 8.50001 2Z" fill="#A3ACA3"/>
                    </svg>
                  <span style={{
                    overflow: 'hidden',
                    color: '#505450',
                    textOverflow: 'ellipsis',
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '20px'
                  }}>ABC</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M5.66665 8C5.66665 8.64433 5.14431 9.16667 4.49998 9.16667C3.85565 9.16667 3.33331 8.64433 3.33331 8C3.33331 7.35567 3.85565 6.83334 4.49998 6.83334C5.14431 6.83334 5.66665 7.35567 5.66665 8ZM9.66665 8C9.66665 8.64433 9.14431 9.16667 8.49998 9.16667C7.85565 9.16667 7.33331 8.64433 7.33331 8C7.33331 7.35567 7.85565 6.83334 8.49998 6.83334C9.14431 6.83334 9.66665 7.35567 9.66665 8ZM12.5 9.16667C13.1443 9.16667 13.6666 8.64433 13.6666 8C13.6666 7.35567 13.1443 6.83334 12.5 6.83334C11.8556 6.83334 11.3333 7.35567 11.3333 8C11.3333 8.64433 11.8556 9.16667 12.5 9.16667Z" fill="#AFAFAF"/>
                    </svg>

                </div>
              </th>
              {/* Answer a question - spans Priority and Due Date */}
              <th className="px-2 py-1 text-center" colSpan={2} style={{
                backgroundColor: '#DCCFFC',
                height: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M7.99995 2C8.2761 2 8.49995 2.22386 8.49995 2.5V6.33333H10.1636C11.1761 6.33333 11.9969 7.15414 11.9969 8.16667V12.2944L13.1466 11.1462C13.342 10.9511 13.6586 10.9513 13.8537 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8502 13.8541C11.6549 14.0492 11.3385 14.0491 11.1434 13.8539L9.14302 11.8536C8.94775 11.6583 8.94775 11.3417 9.14302 11.1464C9.33828 10.9512 9.65486 10.9512 9.85012 11.1464L10.9969 12.2932V8.16667C10.9969 7.70643 10.6238 7.33333 10.1636 7.33333H5.83322C5.37298 7.33333 4.99989 7.70643 4.99989 8.16667V12.2932L6.14667 11.1464C6.34193 10.9512 6.65852 10.9512 6.85378 11.1464C7.04904 11.3417 7.04904 11.6583 6.85378 11.8536L4.85344 13.8539C4.65818 14.0492 4.3416 14.0492 4.14634 13.8539L2.14596 11.8536C1.9507 11.6583 1.95069 11.3417 2.14595 11.1465C2.34122 10.9512 2.6578 10.9512 2.85306 11.1464L3.99989 12.2932V8.16667C3.99989 7.15414 4.8207 6.33333 5.83322 6.33333H7.49995V2.5C7.49995 2.22386 7.72381 2 7.99995 2Z" fill="white"/>
                    </svg>
                  <span style={{
                    overflow: 'hidden',
                    color: '#463E59',
                    textOverflow: 'ellipsis',
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '20px'
                  }}>Answer a question</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M5.66665 8C5.66665 8.64433 5.14431 9.16667 4.49998 9.16667C3.85565 9.16667 3.33331 8.64433 3.33331 8C3.33331 7.35567 3.85565 6.83334 4.49998 6.83334C5.14431 6.83334 5.66665 7.35567 5.66665 8ZM9.66665 8C9.66665 8.64433 9.14431 9.16667 8.49998 9.16667C7.85565 9.16667 7.33331 8.64433 7.33331 8C7.33331 7.35567 7.85565 6.83334 8.49998 6.83334C9.14431 6.83334 9.66665 7.35567 9.66665 8ZM12.5 9.16667C13.1443 9.16667 13.6666 8.64433 13.6666 8C13.6666 7.35567 13.1443 6.83334 12.5 6.83334C11.8556 6.83334 11.3333 7.35567 11.3333 8C11.3333 8.64433 11.8556 9.16667 12.5 9.16667Z" fill="#AFAFAF"/>
                    </svg>

                </div>
              </th>
              {/* Extract - only above Est. Value */}
              <th className="px-2 py-1 text-center" style={{
                backgroundColor: '#FAC2AF',
                height: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div className="flex items-center justify-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M7.99995 2C8.2761 2 8.49995 2.22386 8.49995 2.5V6.33333H10.1636C11.1761 6.33333 11.9969 7.15414 11.9969 8.16667V12.2944L13.1466 11.1462C13.342 10.9511 13.6586 10.9513 13.8537 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8502 13.8541C11.6549 14.0492 11.3385 14.0491 11.1434 13.8539L9.14302 11.8536C8.94775 11.6583 8.94775 11.3417 9.14302 11.1464C9.33828 10.9512 9.65486 10.9512 9.85012 11.1464L10.9969 12.2932V8.16667C10.9969 7.70643 10.6238 7.33333 10.1636 7.33333H5.83322C5.37298 7.33333 4.99989 7.70643 4.99989 8.16667V12.2932L6.14667 11.1464C6.34193 10.9512 6.65852 10.9512 6.85378 11.1464C7.04904 11.3417 7.04904 11.6583 6.85378 11.8536L4.85344 13.8539C4.65818 14.0492 4.3416 14.0492 4.14634 13.8539L2.14596 11.8536C1.9507 11.6583 1.95069 11.3417 2.14595 11.1465C2.34122 10.9512 2.6578 10.9512 2.85306 11.1464L3.99989 12.2932V8.16667C3.99989 7.15414 4.8207 6.33333 5.83322 6.33333H7.49995V2.5C7.49995 2.22386 7.72381 2 7.99995 2Z" fill="white"/>
                    </svg>
                  <span style={{
                    overflow: 'hidden',
                    color: '#695149',
                    textOverflow: 'ellipsis',
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '20px'
                  }}>Extract</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M5.66665 8C5.66665 8.64433 5.14431 9.16667 4.49998 9.16667C3.85565 9.16667 3.33331 8.64433 3.33331 8C3.33331 7.35567 3.85565 6.83334 4.49998 6.83334C5.14431 6.83334 5.66665 7.35567 5.66665 8ZM9.66665 8C9.66665 8.64433 9.14431 9.16667 8.49998 9.16667C7.85565 9.16667 7.33331 8.64433 7.33331 8C7.33331 7.35567 7.85565 6.83334 8.49998 6.83334C9.14431 6.83334 9.66665 7.35567 9.66665 8ZM12.5 9.16667C13.1443 9.16667 13.6666 8.64433 13.6666 8C13.6666 7.35567 13.1443 6.83334 12.5 6.83334C11.8556 6.83334 11.3333 7.35567 11.3333 8C11.3333 8.64433 11.8556 9.16667 12.5 9.16667Z" fill="#AFAFAF"/>
                    </svg>

                </div>
              </th>
              {/* Empty cell above plus column */}
              <th className="px-2 py-1 w-32" style={{ backgroundColor: '#eeeeee', height: '24px', border: '1px solid #E5E7EB' }}>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="#04071e" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </th>
            </tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  // Define background colors for specific columns
                  let backgroundColor = '#F8F9FA'; // Default gray background
                  let textColor = '#212529'; // Default text color

                  if (index === 0) {
                    backgroundColor = '#E9ECEF'; // Row number column
                  } else if (index >= 1 && index <= 4) {
                    backgroundColor = '#eeeeee'; // Q3 Financial Overview columns (Job Request, Submitted, Status, Submitter)
                    textColor = '#757575'; // Gray text color for these headings
                  } else if (index === 5) {
                    backgroundColor = '#eeeeee'; // URL column
                    textColor = '#757575'; // Gray text color for URL heading
                  } else if (index === 6) {
                    backgroundColor = '#e8f0e9'; // ABC (Assigned)
                  } else if (index === 7 || index === 8) {
                    backgroundColor = '#eae3fc'; // Answer a question (Priority, Due Date)
                  } else if (index === 9) {
                    backgroundColor = '#ffe9e0'; // Extract (Est. Value)
                  } else if (index === 10) {
                    backgroundColor = '#ffffff'; // Plus column
                    textColor = '#04071e';
                  }


                    // Define font styles for specific columns
                  let fontStyles = {};
                  if (index >= 1 && index <= 5) {
                    // Job Request, Submitted, Status, Submitter, URL headings
                    fontStyles = {
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '12px',
                      fontWeight: '600',
                      lineHeight: '16px',
                      color: '#757575',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    };
                  }

                  return (
                    <th
                      key={header.id}
                      className={`px-2 py-1 text-left text-xs ${
                        index >= 1 && index <= 5 ? 'font-bold' : 'font-semibold'
                      } tracking-wide ${
                        index === 0 ? 'w-12' : ''
                      } ${index === 10 ? 'w-32' : ''} ${header.column.getCanSort() ? 'cursor-pointer hover:opacity-80' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        backgroundColor,
                        height: '32px',
                        border: '1px solid #E5E7EB',
                        ...fontStyles,
                        ...(index >= 1 && index <= 5 ? {} : { color: textColor })
                      }}
                    >
                    <div className="flex items-center justify-between h-full">
                      <span className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                      {header.column.getCanSort() && (
                        <span className="ml-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.14645 4.14645C2.34171 3.95118 2.65829 3.95118 2.85355 4.14645L6 7.29289L9.14645 4.14645C9.34171 3.95118 9.65829 3.95118 9.85355 4.14645C10.0488 4.34171 10.0488 4.65829 9.85355 4.85355L6.35355 8.35355C6.15829 8.54882 5.84171 8.54882 5.64645 8.35355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645Z" fill="#AFAFAF"/>
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-green-50">
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === cellIndex;
                  return (
                    <td
                      key={cell.id}
                      className={`px-2 py-1 cursor-pointer ${
                        cellIndex === 0 ? 'bg-gray-100 font-mono text-gray-500 text-center' : 'bg-white'
                      }`}
                      onClick={() => setSelectedCell({ row: rowIndex, col: cellIndex })}
                      onContextMenu={(e) => handleRightClick(e, rowIndex, cellIndex)}
                      style={{
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: '13px',
                        fontWeight: '500',
                        height: '32px',
                        border: '1px solid #E5E7EB',
                        background: isSelected ? '#FFF' : (cellIndex === 0 ? '#f8f9fa' : '#FFF'),
                        outline: isSelected ? '2px solid #6C8B70' : 'none',
                        outlineOffset: isSelected ? '-2px' : '0',
                        boxShadow: isSelected ? '0px 0px 4px -2px rgba(10, 110, 61, 0.60), 0px 0px 12px 0px rgba(10, 110, 61, 0.22)' : 'none',
                        color: cellIndex === 0 ? '#6C757D' : '#121212',
                        verticalAlign: 'middle',
                        position: 'relative',
                        zIndex: isSelected ? 10 : 1
                      }}
                    >
                      {cell.getValue() === '' && cellIndex > 0 ? (
                        <div className="h-5"></div>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Navigation */}
      <Footer onTabChange={(tab) => console.log('Tab changed to:', tab)} />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
        />
      )}
    </div>
  );
};
