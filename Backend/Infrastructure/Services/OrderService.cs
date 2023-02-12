using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;

        public OrderService(IDbContextFactory<OMAContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IQueryable<Order> GetOrders()
        {
            var context = _contextFactory.CreateDbContext();

            return context.Orders
                    .Where(o => !o.IsDeleted)
                    .Include(o => o.Customer);
        }

        public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
        {
            var context = _contextFactory.CreateDbContext();
            Order order;

            var customer = await context.Customers
                            .Where(c => c.Id == orderModel.CustomerId)
                            .FirstOrDefaultAsync();
            
            if(customer == null)
                throw new Exception($"Customer with id {orderModel.CustomerId} was not found");
            
            if(orderModel.Id == null)
            {
                order = new Order
                {
                    CustomerId = orderModel.CustomerId,
                    OrderDate = orderModel.OrderDate,
                    Description = orderModel.Description,
                    TotalAmount = orderModel.TotalAmount,
                    DepositAmount = orderModel.DepositAmount,
                    IsDelivery = orderModel.IsDelivery,
                    Status = orderModel.Status,
                    OtherNotes = orderModel.OtherNotes
                };

                await context.Orders.AddAsync(order);
            }
            else
            {
                order = await context.Orders
                            .Where(o => o.Id == orderModel.Id)
                            .FirstOrDefaultAsync();

                if(order == null)
                    throw new Exception($"Order with id {orderModel.Id} was not found");
    
                order.OrderDate = orderModel.OrderDate;
                order.Description = orderModel.Description;
                order.TotalAmount = orderModel.TotalAmount;
                order.DepositAmount = orderModel.DepositAmount;
                order.IsDelivery = orderModel.IsDelivery;
                order.Status = orderModel.Status;
                order.OtherNotes = orderModel.OtherNotes;

                context.Orders.Update(order);
            }
            await context.SaveChangesAsync();

            return order;
        }
    }
}