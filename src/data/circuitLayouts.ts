import { CircuitLayout } from '../types';

export const heroCircuitLayout: CircuitLayout = {
  width: 800,
  height: 400,
  traces: [
    {
      id: 'h-t1',
      points: [
        [400, 200],
        [460, 140],
        [620, 140],
        [680, 200],
        [760, 200],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 'h-t2',
      points: [
        [400, 200],
        [400, 70],
        [360, 30],
        [220, 30],
      ],
      color: 'steel',
      width: 1.5,
    },
    {
      id: 'h-t3',
      points: [
        [400, 200],
        [330, 130],
        [160, 130],
        [100, 190],
        [40, 190],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 'h-t4',
      points: [
        [400, 200],
        [260, 200],
        [200, 260],
        [60, 260],
      ],
      color: 'steel',
      width: 1.5,
    },
    {
      id: 'h-t5',
      points: [
        [400, 200],
        [340, 260],
        [340, 340],
        [300, 380],
        [180, 380],
      ],
      color: 'steel',
      width: 1.5,
    },
    {
      id: 'h-t6',
      points: [
        [400, 200],
        [470, 270],
        [580, 270],
        [580, 350],
        [620, 390],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 'h-t7',
      points: [
        [400, 200],
        [550, 200],
        [610, 140],
        [610, 60],
      ],
      color: 'copper',
      width: 1.5,
    },
  ],
  nodes: [
    { id: 'h-n-center', cx: 400, cy: 200, r: 8, color: 'copper', ring: true },
    { id: 'h-n1', cx: 620, cy: 140, r: 3.5, color: 'steel' },
    { id: 'h-n2', cx: 760, cy: 200, r: 5, color: 'navy' },
    { id: 'h-n3', cx: 220, cy: 30, r: 4, color: 'steel' },
    { id: 'h-n4', cx: 40, cy: 190, r: 5, color: 'navy' },
    { id: 'h-n5', cx: 60, cy: 260, r: 4, color: 'copper' },
    { id: 'h-n6', cx: 180, cy: 380, r: 4, color: 'steel' },
    { id: 'h-n7', cx: 620, cy: 390, r: 5, color: 'navy' },
    { id: 'h-n8', cx: 610, cy: 60, r: 4, color: 'steel' },
  ],
};

export const secondaryCircuitLayout: CircuitLayout = {
  width: 800,
  height: 400,
  traces: [
    {
      id: 's-t1',
      points: [
        [250, 220],
        [250, 120],
        [300, 70],
        [500, 70],
        [560, 130],
        [720, 130],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 's-t2',
      points: [
        [250, 220],
        [320, 150],
        [480, 150],
        [540, 210],
        [680, 210],
      ],
      color: 'steel',
      width: 1.5,
    },
    {
      id: 's-t3',
      points: [
        [250, 220],
        [180, 220],
        [130, 170],
        [50, 170],
      ],
      color: 'steel',
      width: 1.5,
    },
    {
      id: 's-t4',
      points: [
        [250, 220],
        [190, 280],
        [190, 340],
        [140, 390],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 's-t5',
      points: [
        [250, 220],
        [330, 300],
        [450, 300],
        [510, 360],
        [650, 360],
      ],
      color: 'navy',
      width: 1.5,
    },
    {
      id: 's-t6',
      points: [
        [250, 220],
        [400, 220],
        [460, 280],
        [600, 280],
        [650, 230],
        [750, 230],
      ],
      color: 'copper',
      width: 1.5,
    },
  ],
  nodes: [
    { id: 's-n-center', cx: 250, cy: 220, r: 8, color: 'copper', ring: true },
    { id: 's-n1', cx: 720, cy: 130, r: 5, color: 'navy' },
    { id: 's-n2', cx: 680, cy: 210, r: 4, color: 'steel' },
    { id: 's-n3', cx: 50, cy: 170, r: 4, color: 'steel' },
    { id: 's-n4', cx: 140, cy: 390, r: 4, color: 'copper' },
    { id: 's-n5', cx: 650, cy: 360, r: 5, color: 'navy' },
    { id: 's-n6', cx: 750, cy: 230, r: 4, color: 'steel' },
    { id: 's-n7', cx: 300, cy: 70, r: 3, color: 'steel' },
  ],
};

export const CIRCUIT_LAYOUTS: CircuitLayout[] = [heroCircuitLayout, secondaryCircuitLayout];
