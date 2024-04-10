import { CellProps, Table } from '@tqman/ink-table';
import axios from 'axios';
import { Argument, Command, OptionValues } from 'commander';
import { Box, render, Text } from 'ink';
import React from 'react';
import { addOptions, authed } from '../common/index.js';

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

interface ViewProps {
  auth: string;
  url: string;
  account: string;
}

interface Pnl {
  symbol: string;
  quantity: number;
  price: string;
  buys: number;
  sells: number;
  realized_pnl: number;
  unrealized_pnl: number;
  total_pnl: number;
}

interface Order {
  updated_at: number;
  symbol: string;
  side: string;
  price: string;
  quantity: string;
  status: string;
  order_id: string;
  order_type: string;
  filled_quantity: number;
  average_price: string;
}

interface PnlViewState {
  pnl: Pnl[];
  timestamp: string;
}

const PnlView: React.FC<ViewProps> = ({ auth, url, account }) => {
  const [state, setState] = React.useState<PnlViewState>({ pnl: [], timestamp: '' });

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const u = `${url}/v2/accounts/${account}/pnl-details`;
        const res = await axios.get(u, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        let timestamp = Number.MIN_VALUE;
        for (const row of res.data.data) {
          timestamp = Math.max(row.timestamp, timestamp);
        }
        setState({ pnl: res.data.data, timestamp: formatTimestamp(timestamp) });
      } catch (e) {
        console.error(`Failed to create view: ${e}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box flexDirection="column">
      <Table
        data={state.pnl.map((row) => {
          return {
            Symbol: row.symbol,
            Quantity: row.quantity,
            Price: Number.parseFloat(row.price).toFixed(2),
            Buys: row.buys,
            Sells: row.sells,
            RealizedPnl: row.realized_pnl.toFixed(0),
            UnrealizedPnl: row.unrealized_pnl.toFixed(0),
            TotalPnl: row.total_pnl.toFixed(0),
          };
        })}
        columns={[
          { key: 'Symbol', align: 'left' },
          { key: 'Quantity', align: 'right' },
          { key: 'Price', align: 'right' },
          { key: 'Buys', align: 'right' },
          { key: 'Sells', align: 'right' },
          { key: 'RealizedPnl', align: 'right' },
          { key: 'UnrealizedPnl', align: 'right' },
          { key: 'TotalPnl', align: 'right' },
        ]}
      />
      <Text color={'cyan'}>{`Last event: ${state.timestamp}`}</Text>
    </Box>
  );
};

const OrdersView: React.FC<ViewProps> = ({ auth, url, account }) => {
  const [state, setState] = React.useState<Order[]>([]);

  const CustomCell = ({ children, column }: CellProps) => {
    const color = column === 2 ? (children?.toString().includes('buy') ? 'green' : 'red') : 'white';
    return <Text color={color}>{children}</Text>;
  };

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const u = `${url}/v2/accounts/${account}/orders?page_size=100`;
        const res = await axios.get(u, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        setState(res.data.data.sort((a: Order, b: Order) => a.updated_at - b.updated_at));
      } catch (e) {
        console.error(`Failed to create view: ${e}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Table
      data={state.map((order) => {
        return {
          Timestamp: formatTimestamp(order.updated_at),
          Symbol: order.symbol,
          Side: order.side,
          Price: order.price ? Number.parseFloat(order.price).toFixed(2) : '',
          Quantity: order.quantity,
          Status: order.status,
          OrderId: order.order_id,
          OrderType: order.order_type,
          Filled: order.filled_quantity,
          AvgPrice: Number.parseFloat(order.average_price).toFixed(4),
        };
      })}
      cell={CustomCell}
      columns={[
        { key: 'Timestamp', align: 'right' },
        { key: 'Symbol', align: 'left' },
        { key: 'Side', align: 'left' },
        { key: 'Price', align: 'right' },
        { key: 'Quantity', align: 'right' },
        { key: 'Status', align: 'left' },
        { key: 'OrderId', align: 'left' },
        { key: 'OrderType', align: 'left' },
        { key: 'Filled', align: 'right' },
        { key: 'AvgPrice', align: 'right' },
      ]}
    />
  );
};

const watch = () =>
  addOptions(
    new Command('watch')
      .description('Watch a predefined view')
      .addArgument(new Argument('<view>', 'The view you want to watch').choices(['pnl', 'orders']))
      .action(
        authed(async (auth: string, view: 'pnl' | 'orders', options: OptionValues) => {
          const { account, url } = options;

          switch (view) {
            case 'pnl':
              render(<PnlView auth={auth} url={url} account={account} />);
              break;
            case 'orders':
              render(<OrdersView auth={auth} url={url} account={account} />);
              break;
          }
        })
      )
  );

export default watch;
