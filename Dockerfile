FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# copy .csproj and restore as distinct layers
COPY "Backend/OrderManagementBackend.sln" "Backend/OrderManagementBackend.sln"
COPY "Backend/API/API.csproj" "Backend/API/API.csproj"
COPY "Backend/Core/Core.csproj" "Backend/Core/Core.csproj"
COPY "Backend/Infrastructure/Infrastructure.csproj" "Backend/Infrastructure/Infrastructure.csproj"

RUN dotnet restore "Backend/OrderManagementBackend.sln"

# copy everything else build
COPY . .
RUN dotnet publish "Backend/OrderManagementBackend.sln" -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]