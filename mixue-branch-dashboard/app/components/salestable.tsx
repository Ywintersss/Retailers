import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesTable({ sales }: { sales: any[] }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Forecast</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No sales data available.
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{sale.date}</TableCell>
                  <TableCell className="text-right">${sale.revenue?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell className="text-right">{sale.ordersCount || 0}</TableCell>
                  <TableCell className="text-right">${sale.forecast?.toFixed(2) || '0.00'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}