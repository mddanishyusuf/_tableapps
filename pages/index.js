import Head from 'next/head';
import Image from 'next/image';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { randomString } from '../functions';
import Router from 'next/router';

export default function Home() {
      const session = useSession();
      const supabase = useSupabaseClient();
      const subscribeNow = async (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const { data, error } = await supabase.auth.signUp({
                  email,
                  password: randomString(16, 'aA#'),
            });

            if (!error) Router.reload();
      };
      return (
            <div>
                  <Head>
                        <title>Table Apps — A software for all your need</title>
                        <meta
                              name="description"
                              content="Generated by create next app"
                        />
                  </Head>

                  <main
                        style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}
                  >
                        <h2
                              style={{
                                    maxWidth: 800,
                                    fontWeight: 700,
                                    fontSize: 24,
                                    color: '#fff',
                              }}
                        >
                              <u>Data tables</u> + <u>Apps</u> +{' '}
                              <u>Automation</u> + <u>Public API</u>
                        </h2>
                        <p>
                              Building this software to store data into table
                              like Airtable, make apps with table data, automate
                              the process like zapier, & Access data via public
                              api. All the power with this simple and powerful
                              product.
                        </p>
                        <br />
                        <p>⏰ Launching in January-2023</p>
                        <br />

                        {!session ? (
                              <>
                                    <p>
                                          Share your email with us just to
                                          remind you.
                                    </p>

                                    <form
                                          onSubmit={subscribeNow}
                                          style={{ maxWidth: 400 }}
                                    >
                                          <input
                                                name="email"
                                                type="email"
                                                placeholder="Your email address"
                                                required
                                          />
                                          <small>
                                                No spam, just a reminder email.
                                          </small>
                                          <br />
                                          <br />

                                          <button type="submit">
                                                Subscribe
                                          </button>
                                    </form>
                              </>
                        ) : (
                              <p className="note">
                                    → Successfully subscribed(
                                    {session.user.email}
                                    ). You will be the first to be notify.
                              </p>
                        )}
                  </main>
            </div>
      );
}
