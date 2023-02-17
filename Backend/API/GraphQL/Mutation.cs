using Core.Entities;
using Core.Interfaces;
using Core.Models;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<Customer> AddOrUpdateCustomer([Service] ICustomerService customerService, CustomerModel customer) 
        {
            return await customerService.AddOrUpdateCustomerAsync(customer);
        }

        public async Task<Order> AddOrUpdateOrder([Service] IOrderService orderService, OrderModel order)
        {
            return await orderService.AddOrUpdateOrderAsync(order);
        }

        public async Task<bool> DeleteCustomer([Service] ICustomerService customerService, int customerId)
        {
            return await customerService.DeleteCustomerAsync(customerId);
        }

        public async Task<bool> DeleteOrder([Service] IOrderService orderService, int orderId)
        {
            return await orderService.DeleteOrderAsync(orderId);
        }
    }
}