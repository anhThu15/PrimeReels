<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $token;

    /**
     * Create a new message instance.
     *
     * @param $user
     * @param $token
     */
    public function __construct($user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = "http://localhost:3000/resetPassword?token={$this->token}&email={$this->user->email}";

        return $this->view('emails.reset_password')
            ->subject('Đặt lại mật khẩu')
            ->with([
                // 'url' => route('password.reset', ['token' => $this->token, 'email' => $this->user->email]),
                'url' => $url
            ]);
    }
}
