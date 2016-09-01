<?php

namespace Novblog\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Config;
use Hash;
use Log;
use Novblog\User;
use \Firebase\JWT\JWT;
use \Firebase\JWT\ExpiredException;

class AuthController extends Controller
{
    protected function jwt(User $user)
    {
        $payload = array(
            'sub'   => $user->id,
            'iat'   => time(),
            'exp'   => time() + 5*60
        );
        return JWT::encode($payload, Config::get('app.jwt-secret-key'));
    }

    /**
     * return registration code
    **/
    protected function registrationCode()
    {
        $r = sprintf('%d', time());
        Log::info('RESULT: '. $r);
        return $r;
    }

    /**
     * return authenticated user
     * return NULL if not authenticated
    **/
    public function user(Request $req, $nullOnFail = false)
    {
        try {
            list($jwtType, $jwt) = explode(' ', $req->header('Authorization'));
        } catch(\ErrorException $e) {
            if ($nullOnFail)
                return null;
            return response()->json(['error' => 'Can not parse Authorization header'], 400);
        }
        if ($jwt) {
            try {
                $credentials = JWT::decode($jwt, Config::get('app.jwt-secret-key'), ['HS256']);
            } catch(ExpiredException $e) {
                if ($nullOnFail)
                    return $nullOnFail;
                return response()->json(['error' => 'jwt_expired'], 400);
            } catch(\Exception $e) {
                if ($nullOnFail)
                    return $nullOnFail;
                return response()->json(['error' => 'An error while decoding jwt'], 400);
            }

            $user = User::where('id', '=', get_object_vars($credentials)['sub'])->first();
            if ($nullOnFail)
                return $user;
            return response()->json(['user' => $user], 200);
        }
        return response()->json(['error' => 'No jwt attached'], 401);
    }

    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), array(
            'name'  => 'required|unique:users|min:4|max:25',
            'email' => 'required|email|unique:users|max:255',
            'password'  => 'required|min:8|max:80'
        ));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = bcrypt($req->input('password'));
        $user->is_active = false;
        $user->registration_code  = $this->registrationCode();
        $user->save();

        return response()->json(['success' => 'Your account created'], 201);
    }

    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), array(
            'email' => 'required|email|min:4|max:255',
            'password'  => 'required|min:8|max:80'
        ));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::where('email', '=', $req->input('email'))->first();

        if (!$user) {
            return response()->json(['error' => 'Your email not exists'], 401);
        }

        if (Hash::check($req->input('password'), $user->password)) {
            return response()->json(['jwt' => $this->jwt($user)], 200);
        } else {
            return response()->json(['error' => 'Wrong passwd'], 401);
        }
    }

    /**
     * Verify user registration via email
    **/
    public function verifyEmail($registration_code)
    {
        $user = User::where('registration_code', '=', $registration_code)->first();
        if ($user) {
            if ($user->is_active) {
                return response()->json(['error' => 'Your account had already verified'], 400);
            }
            $user->is_active = 1;
            $user->save();
            return response()->json(['success' => 'Verify account successfully']);
        }
        return response()->json(['error' => 'Registration code not found'], 404);
    }
}
