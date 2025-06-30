using Duende.IdentityServer.Models;

namespace Tannit.AuthServer.Config
{
    public static class IdentityConfig
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(), // Obligatoire pour OpenID Connect
                new IdentityResources.Profile(), // Facultatif mais souvent utilisé pour récupérer nom, email, etc.
                new IdentityResources.Email()
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("tannitapi.read", "Read access to Tannit API"),
                new ApiScope("tannitapi.write", "Write access to Tannit API")
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "tannit_web_client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequireConsent = false,


                    RedirectUris = { "https://localhost:3000/signin-oidc" }, // à adapter par la suite selon le frontend
                    //PostLogoutRedirectUris = { "https://localhost:3000/logout" },

                    AllowedScopes = { "openid", "profile", "email", "tannitapi.read" },
                    AllowAccessTokensViaBrowser = true,
                    RequirePkce = false
                }
            };
    }
}
