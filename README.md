<p align="center">
<img src="logo.webp" width="200" height="200" />
<h1 align="center">stuctl</h1>
<p align="center">
Studio control, better known as <i>stuctl</i> (affectionately pronounced <i>stew</i>-<i>cuttle</i>), is a simple command-line tool for interacting with Clear Street Studio via it's <a href="https://docs.clearstreet.io">public APIs</a>
</p>
<p align="center">
    <img src="demo.svg" />
</p>
</p>

## Usage

The only prerequisite for using `stuctl` is having [nodejs](https://nodejs.org/) `v20.11.1` or higher installed.

Assuming you're running the right version node, run the following command to install `stuctl`:

```bash
$ npm install -g @clear-street/stuctl
```

Most commands provided by `stuctl` require authentication. To properly authenticate, you need to follow Clear Street Studio's [OAuth2 flow](https://docs.clearstreet.io/docs/authentication-1):

If you don't have an OAuth2 credentials already, here are the steps:

1. Sign into [Clear Street Studio](https://studio.clearstreet.io)
1. Navigate to `Settings -> Developer`
1. Create a new OAuth2 API credential
1. Download your credentials to a secure location

Now, you can provide `stuctl` the proper authentication using the `login` command:

```bash
$ stuctl login /path/to/oauth2-creds.json
```

You can now successfully invoke other `stuctl` commands, like `buy`, `sell`, etc.

## Data

This app persists data, such as access tokens, for use between runs. This data is stored in a file named `.sturc`. Values from the `.sturc` file are injected as environment variables when `stuctl` runs. The `.sturc` file lives in `~/.sturc` on Linux-based systems, or `%USERPROFILE%/.sturc` on Windows systems.

Since access tokens are stored in this file, _it's important you keep this file safe and secure._

You can additionally manually add these values to your `.sturc` file to avoid having to provide them through command-line arguments:

- `ACCOUNT=<your-account>`

This will default all commands that require an account to use `<your-account>`.

- `URL=<studio-api-url>`

This will point `stuctl` to the provided Studio API URL.

### Legal Disclaimer

THIS SOFTWARE IS PROVIDED BY CLEAR STREET "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CLEAR STREET BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

By using this software, you acknowledge that you have read this disclaimer, understand it, and agree to be bound by its terms. Clear Street does not warrant that the functions contained in the software will meet your requirements or that the operation of the software will be uninterrupted or error-free. You assume responsibility for selecting the software to achieve your intended results and for the use and results obtained from the software.

This disclaimer of warranty constitutes an essential part of this agreement. No use of the software is authorized hereunder except under this disclaimer.
